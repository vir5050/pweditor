/**
 * @license
 * Copyright 2015 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PDFJS;

(function(PDFJS) {
    "use strict";
    var JpegImage = function jpegImage() {
        var dctZigZag = new Uint8Array([ 0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63 ]);
        var dctCos1 = 4017;
        var dctSin1 = 799;
        var dctCos3 = 3406;
        var dctSin3 = 2276;
        var dctCos6 = 1567;
        var dctSin6 = 3784;
        var dctSqrt2 = 5793;
        var dctSqrt1d2 = 2896;
        function constructor() {}
        function buildHuffmanTable(codeLengths, values) {
            var k = 0, code = [], i, j, length = 16;
            while (length > 0 && !codeLengths[length - 1]) {
                length--;
            }
            code.push({
                children: [],
                index: 0
            });
            var p = code[0], q;
            for (i = 0; i < length; i++) {
                for (j = 0; j < codeLengths[i]; j++) {
                    p = code.pop();
                    p.children[p.index] = values[k];
                    while (p.index > 0) {
                        p = code.pop();
                    }
                    p.index++;
                    code.push(p);
                    while (code.length <= i) {
                        code.push(q = {
                            children: [],
                            index: 0
                        });
                        p.children[p.index] = q.children;
                        p = q;
                    }
                    k++;
                }
                if (i + 1 < length) {
                    code.push(q = {
                        children: [],
                        index: 0
                    });
                    p.children[p.index] = q.children;
                    p = q;
                }
            }
            return code[0].children;
        }
        function getBlockBufferOffset(component, row, col) {
            return 64 * ((component.blocksPerLine + 1) * row + col);
        }
        function decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
            var precision = frame.precision;
            var samplesPerLine = frame.samplesPerLine;
            var scanLines = frame.scanLines;
            var mcusPerLine = frame.mcusPerLine;
            var progressive = frame.progressive;
            var maxH = frame.maxH, maxV = frame.maxV;
            var startOffset = offset, bitsData = 0, bitsCount = 0;
            function readBit() {
                if (bitsCount > 0) {
                    bitsCount--;
                    return bitsData >> bitsCount & 1;
                }
                bitsData = data[offset++];
                if (bitsData === 255) {
                    var nextByte = data[offset++];
                    if (nextByte) {
                        throw "unexpected marker: " + (bitsData << 8 | nextByte).toString(16);
                    }
                }
                bitsCount = 7;
                return bitsData >>> 7;
            }
            function decodeHuffman(tree) {
                var node = tree;
                while (true) {
                    node = node[readBit()];
                    if (typeof node === "number") {
                        return node;
                    }
                    if (typeof node !== "object") {
                        throw "invalid huffman sequence";
                    }
                }
            }
            function receive(length) {
                var n = 0;
                while (length > 0) {
                    n = n << 1 | readBit();
                    length--;
                }
                return n;
            }
            function receiveAndExtend(length) {
                if (length === 1) {
                    return readBit() === 1 ? 1 : -1;
                }
                var n = receive(length);
                if (n >= 1 << length - 1) {
                    return n;
                }
                return n + (-1 << length) + 1;
            }
            function decodeBaseline(component, offset) {
                var t = decodeHuffman(component.huffmanTableDC);
                var diff = t === 0 ? 0 : receiveAndExtend(t);
                component.blockData[offset] = component.pred += diff;
                var k = 1;
                while (k < 64) {
                    var rs = decodeHuffman(component.huffmanTableAC);
                    var s = rs & 15, r = rs >> 4;
                    if (s === 0) {
                        if (r < 15) {
                            break;
                        }
                        k += 16;
                        continue;
                    }
                    k += r;
                    var z = dctZigZag[k];
                    component.blockData[offset + z] = receiveAndExtend(s);
                    k++;
                }
            }
            function decodeDCFirst(component, offset) {
                var t = decodeHuffman(component.huffmanTableDC);
                var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
                component.blockData[offset] = component.pred += diff;
            }
            function decodeDCSuccessive(component, offset) {
                component.blockData[offset] |= readBit() << successive;
            }
            var eobrun = 0;
            function decodeACFirst(component, offset) {
                if (eobrun > 0) {
                    eobrun--;
                    return;
                }
                var k = spectralStart, e = spectralEnd;
                while (k <= e) {
                    var rs = decodeHuffman(component.huffmanTableAC);
                    var s = rs & 15, r = rs >> 4;
                    if (s === 0) {
                        if (r < 15) {
                            eobrun = receive(r) + (1 << r) - 1;
                            break;
                        }
                        k += 16;
                        continue;
                    }
                    k += r;
                    var z = dctZigZag[k];
                    component.blockData[offset + z] = receiveAndExtend(s) * (1 << successive);
                    k++;
                }
            }
            var successiveACState = 0, successiveACNextValue;
            function decodeACSuccessive(component, offset) {
                var k = spectralStart;
                var e = spectralEnd;
                var r = 0;
                var s;
                var rs;
                while (k <= e) {
                    var z = dctZigZag[k];
                    switch (successiveACState) {
                      case 0:
                        rs = decodeHuffman(component.huffmanTableAC);
                        s = rs & 15;
                        r = rs >> 4;
                        if (s === 0) {
                            if (r < 15) {
                                eobrun = receive(r) + (1 << r);
                                successiveACState = 4;
                            } else {
                                r = 16;
                                successiveACState = 1;
                            }
                        } else {
                            if (s !== 1) {
                                throw "invalid ACn encoding";
                            }
                            successiveACNextValue = receiveAndExtend(s);
                            successiveACState = r ? 2 : 3;
                        }
                        continue;

                      case 1:
                      case 2:
                        if (component.blockData[offset + z]) {
                            component.blockData[offset + z] += readBit() << successive;
                        } else {
                            r--;
                            if (r === 0) {
                                successiveACState = successiveACState === 2 ? 3 : 0;
                            }
                        }
                        break;

                      case 3:
                        if (component.blockData[offset + z]) {
                            component.blockData[offset + z] += readBit() << successive;
                        } else {
                            component.blockData[offset + z] = successiveACNextValue << successive;
                            successiveACState = 0;
                        }
                        break;

                      case 4:
                        if (component.blockData[offset + z]) {
                            component.blockData[offset + z] += readBit() << successive;
                        }
                        break;
                    }
                    k++;
                }
                if (successiveACState === 4) {
                    eobrun--;
                    if (eobrun === 0) {
                        successiveACState = 0;
                    }
                }
            }
            function decodeMcu(component, decode, mcu, row, col) {
                var mcuRow = mcu / mcusPerLine | 0;
                var mcuCol = mcu % mcusPerLine;
                var blockRow = mcuRow * component.v + row;
                var blockCol = mcuCol * component.h + col;
                var offset = getBlockBufferOffset(component, blockRow, blockCol);
                decode(component, offset);
            }
            function decodeBlock(component, decode, mcu) {
                var blockRow = mcu / component.blocksPerLine | 0;
                var blockCol = mcu % component.blocksPerLine;
                var offset = getBlockBufferOffset(component, blockRow, blockCol);
                decode(component, offset);
            }
            var componentsLength = components.length;
            var component, i, j, k, n;
            var decodeFn;
            if (progressive) {
                if (spectralStart === 0) {
                    decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
                } else {
                    decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
                }
            } else {
                decodeFn = decodeBaseline;
            }
            var mcu = 0, marker;
            var mcuExpected;
            if (componentsLength === 1) {
                mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
            } else {
                mcuExpected = mcusPerLine * frame.mcusPerColumn;
            }
            if (!resetInterval) {
                resetInterval = mcuExpected;
            }
            var h, v;
            while (mcu < mcuExpected) {
                for (i = 0; i < componentsLength; i++) {
                    components[i].pred = 0;
                }
                eobrun = 0;
                if (componentsLength === 1) {
                    component = components[0];
                    for (n = 0; n < resetInterval; n++) {
                        decodeBlock(component, decodeFn, mcu);
                        mcu++;
                    }
                } else {
                    for (n = 0; n < resetInterval; n++) {
                        for (i = 0; i < componentsLength; i++) {
                            component = components[i];
                            h = component.h;
                            v = component.v;
                            for (j = 0; j < v; j++) {
                                for (k = 0; k < h; k++) {
                                    decodeMcu(component, decodeFn, mcu, j, k);
                                }
                            }
                        }
                        mcu++;
                    }
                }
                bitsCount = 0;
                marker = data[offset] << 8 | data[offset + 1];
                if (marker <= 65280) {
                    throw "marker was not found";
                }
                if (marker >= 65488 && marker <= 65495) {
                    offset += 2;
                } else {
                    break;
                }
            }
            return offset - startOffset;
        }
        function quantizeAndInverse(component, blockBufferOffset, p) {
            var qt = component.quantizationTable, blockData = component.blockData;
            var v0, v1, v2, v3, v4, v5, v6, v7;
            var p0, p1, p2, p3, p4, p5, p6, p7;
            var t;
            for (var row = 0; row < 64; row += 8) {
                p0 = blockData[blockBufferOffset + row];
                p1 = blockData[blockBufferOffset + row + 1];
                p2 = blockData[blockBufferOffset + row + 2];
                p3 = blockData[blockBufferOffset + row + 3];
                p4 = blockData[blockBufferOffset + row + 4];
                p5 = blockData[blockBufferOffset + row + 5];
                p6 = blockData[blockBufferOffset + row + 6];
                p7 = blockData[blockBufferOffset + row + 7];
                p0 *= qt[row];
                if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
                    t = dctSqrt2 * p0 + 512 >> 10;
                    p[row] = t;
                    p[row + 1] = t;
                    p[row + 2] = t;
                    p[row + 3] = t;
                    p[row + 4] = t;
                    p[row + 5] = t;
                    p[row + 6] = t;
                    p[row + 7] = t;
                    continue;
                }
                p1 *= qt[row + 1];
                p2 *= qt[row + 2];
                p3 *= qt[row + 3];
                p4 *= qt[row + 4];
                p5 *= qt[row + 5];
                p6 *= qt[row + 6];
                p7 *= qt[row + 7];
                v0 = dctSqrt2 * p0 + 128 >> 8;
                v1 = dctSqrt2 * p4 + 128 >> 8;
                v2 = p2;
                v3 = p6;
                v4 = dctSqrt1d2 * (p1 - p7) + 128 >> 8;
                v7 = dctSqrt1d2 * (p1 + p7) + 128 >> 8;
                v5 = p3 << 4;
                v6 = p5 << 4;
                v0 = v0 + v1 + 1 >> 1;
                v1 = v0 - v1;
                t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
                v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
                v3 = t;
                v4 = v4 + v6 + 1 >> 1;
                v6 = v4 - v6;
                v7 = v7 + v5 + 1 >> 1;
                v5 = v7 - v5;
                v0 = v0 + v3 + 1 >> 1;
                v3 = v0 - v3;
                v1 = v1 + v2 + 1 >> 1;
                v2 = v1 - v2;
                t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
                v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
                v7 = t;
                t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
                v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
                v6 = t;
                p[row] = v0 + v7;
                p[row + 7] = v0 - v7;
                p[row + 1] = v1 + v6;
                p[row + 6] = v1 - v6;
                p[row + 2] = v2 + v5;
                p[row + 5] = v2 - v5;
                p[row + 3] = v3 + v4;
                p[row + 4] = v3 - v4;
            }
            for (var col = 0; col < 8; ++col) {
                p0 = p[col];
                p1 = p[col + 8];
                p2 = p[col + 16];
                p3 = p[col + 24];
                p4 = p[col + 32];
                p5 = p[col + 40];
                p6 = p[col + 48];
                p7 = p[col + 56];
                if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
                    t = dctSqrt2 * p0 + 8192 >> 14;
                    t = t < -2040 ? 0 : t >= 2024 ? 255 : t + 2056 >> 4;
                    blockData[blockBufferOffset + col] = t;
                    blockData[blockBufferOffset + col + 8] = t;
                    blockData[blockBufferOffset + col + 16] = t;
                    blockData[blockBufferOffset + col + 24] = t;
                    blockData[blockBufferOffset + col + 32] = t;
                    blockData[blockBufferOffset + col + 40] = t;
                    blockData[blockBufferOffset + col + 48] = t;
                    blockData[blockBufferOffset + col + 56] = t;
                    continue;
                }
                v0 = dctSqrt2 * p0 + 2048 >> 12;
                v1 = dctSqrt2 * p4 + 2048 >> 12;
                v2 = p2;
                v3 = p6;
                v4 = dctSqrt1d2 * (p1 - p7) + 2048 >> 12;
                v7 = dctSqrt1d2 * (p1 + p7) + 2048 >> 12;
                v5 = p3;
                v6 = p5;
                v0 = (v0 + v1 + 1 >> 1) + 4112;
                v1 = v0 - v1;
                t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
                v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
                v3 = t;
                v4 = v4 + v6 + 1 >> 1;
                v6 = v4 - v6;
                v7 = v7 + v5 + 1 >> 1;
                v5 = v7 - v5;
                v0 = v0 + v3 + 1 >> 1;
                v3 = v0 - v3;
                v1 = v1 + v2 + 1 >> 1;
                v2 = v1 - v2;
                t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
                v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
                v7 = t;
                t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
                v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
                v6 = t;
                p0 = v0 + v7;
                p7 = v0 - v7;
                p1 = v1 + v6;
                p6 = v1 - v6;
                p2 = v2 + v5;
                p5 = v2 - v5;
                p3 = v3 + v4;
                p4 = v3 - v4;
                p0 = p0 < 16 ? 0 : p0 >= 4080 ? 255 : p0 >> 4;
                p1 = p1 < 16 ? 0 : p1 >= 4080 ? 255 : p1 >> 4;
                p2 = p2 < 16 ? 0 : p2 >= 4080 ? 255 : p2 >> 4;
                p3 = p3 < 16 ? 0 : p3 >= 4080 ? 255 : p3 >> 4;
                p4 = p4 < 16 ? 0 : p4 >= 4080 ? 255 : p4 >> 4;
                p5 = p5 < 16 ? 0 : p5 >= 4080 ? 255 : p5 >> 4;
                p6 = p6 < 16 ? 0 : p6 >= 4080 ? 255 : p6 >> 4;
                p7 = p7 < 16 ? 0 : p7 >= 4080 ? 255 : p7 >> 4;
                blockData[blockBufferOffset + col] = p0;
                blockData[blockBufferOffset + col + 8] = p1;
                blockData[blockBufferOffset + col + 16] = p2;
                blockData[blockBufferOffset + col + 24] = p3;
                blockData[blockBufferOffset + col + 32] = p4;
                blockData[blockBufferOffset + col + 40] = p5;
                blockData[blockBufferOffset + col + 48] = p6;
                blockData[blockBufferOffset + col + 56] = p7;
            }
        }
        function buildComponentData(frame, component) {
            var blocksPerLine = component.blocksPerLine;
            var blocksPerColumn = component.blocksPerColumn;
            var computationBuffer = new Int16Array(64);
            for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
                for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
                    var offset = getBlockBufferOffset(component, blockRow, blockCol);
                    quantizeAndInverse(component, offset, computationBuffer);
                }
            }
            return component.blockData;
        }
        function clamp0to255(a) {
            return a <= 0 ? 0 : a >= 255 ? 255 : a;
        }
        constructor.prototype = {
            parse: function parse(data) {
                function readUint16() {
                    var value = data[offset] << 8 | data[offset + 1];
                    offset += 2;
                    return value;
                }
                function readDataBlock() {
                    var length = readUint16();
                    var array = data.subarray(offset, offset + length - 2);
                    offset += array.length;
                    return array;
                }
                function prepareComponents(frame) {
                    var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / frame.maxH);
                    var mcusPerColumn = Math.ceil(frame.scanLines / 8 / frame.maxV);
                    for (var i = 0; i < frame.components.length; i++) {
                        component = frame.components[i];
                        var blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / frame.maxH);
                        var blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / frame.maxV);
                        var blocksPerLineForMcu = mcusPerLine * component.h;
                        var blocksPerColumnForMcu = mcusPerColumn * component.v;
                        var blocksBufferSize = 64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
                        component.blockData = new Int16Array(blocksBufferSize);
                        component.blocksPerLine = blocksPerLine;
                        component.blocksPerColumn = blocksPerColumn;
                    }
                    frame.mcusPerLine = mcusPerLine;
                    frame.mcusPerColumn = mcusPerColumn;
                }
                var offset = 0, length = data.length;
                var jfif = null;
                var adobe = null;
                var pixels = null;
                var frame, resetInterval;
                var quantizationTables = [];
                var huffmanTablesAC = [], huffmanTablesDC = [];
                var fileMarker = readUint16();
                if (fileMarker !== 65496) {
                    throw "SOI not found";
                }
                fileMarker = readUint16();
                while (fileMarker !== 65497) {
                    var i, j, l;
                    switch (fileMarker) {
                      case 65504:
                      case 65505:
                      case 65506:
                      case 65507:
                      case 65508:
                      case 65509:
                      case 65510:
                      case 65511:
                      case 65512:
                      case 65513:
                      case 65514:
                      case 65515:
                      case 65516:
                      case 65517:
                      case 65518:
                      case 65519:
                      case 65534:
                        var appData = readDataBlock();
                        if (fileMarker === 65504) {
                            if (appData[0] === 74 && appData[1] === 70 && appData[2] === 73 && appData[3] === 70 && appData[4] === 0) {
                                jfif = {
                                    version: {
                                        major: appData[5],
                                        minor: appData[6]
                                    },
                                    densityUnits: appData[7],
                                    xDensity: appData[8] << 8 | appData[9],
                                    yDensity: appData[10] << 8 | appData[11],
                                    thumbWidth: appData[12],
                                    thumbHeight: appData[13],
                                    thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                                };
                            }
                        }
                        if (fileMarker === 65518) {
                            if (appData[0] === 65 && appData[1] === 100 && appData[2] === 111 && appData[3] === 98 && appData[4] === 101 && appData[5] === 0) {
                                adobe = {
                                    version: appData[6],
                                    flags0: appData[7] << 8 | appData[8],
                                    flags1: appData[9] << 8 | appData[10],
                                    transformCode: appData[11]
                                };
                            }
                        }
                        break;

                      case 65499:
                        var quantizationTablesLength = readUint16();
                        var quantizationTablesEnd = quantizationTablesLength + offset - 2;
                        var z;
                        while (offset < quantizationTablesEnd) {
                            var quantizationTableSpec = data[offset++];
                            var tableData = new Uint16Array(64);
                            if (quantizationTableSpec >> 4 === 0) {
                                for (j = 0; j < 64; j++) {
                                    z = dctZigZag[j];
                                    tableData[z] = data[offset++];
                                }
                            } else if (quantizationTableSpec >> 4 === 1) {
                                for (j = 0; j < 64; j++) {
                                    z = dctZigZag[j];
                                    tableData[z] = readUint16();
                                }
                            } else {
                                throw "DQT: invalid table spec";
                            }
                            quantizationTables[quantizationTableSpec & 15] = tableData;
                        }
                        break;

                      case 65472:
                      case 65473:
                      case 65474:
                        if (frame) {
                            throw "Only single frame JPEGs supported";
                        }
                        readUint16();
                        frame = {};
                        frame.extended = fileMarker === 65473;
                        frame.progressive = fileMarker === 65474;
                        frame.precision = data[offset++];
                        frame.scanLines = readUint16();
                        frame.samplesPerLine = readUint16();
                        frame.components = [];
                        frame.componentIds = {};
                        var componentsCount = data[offset++], componentId;
                        var maxH = 0, maxV = 0;
                        for (i = 0; i < componentsCount; i++) {
                            componentId = data[offset];
                            var h = data[offset + 1] >> 4;
                            var v = data[offset + 1] & 15;
                            if (maxH < h) {
                                maxH = h;
                            }
                            if (maxV < v) {
                                maxV = v;
                            }
                            var qId = data[offset + 2];
                            l = frame.components.push({
                                h: h,
                                v: v,
                                quantizationTable: quantizationTables[qId]
                            });
                            frame.componentIds[componentId] = l - 1;
                            offset += 3;
                        }
                        frame.maxH = maxH;
                        frame.maxV = maxV;
                        prepareComponents(frame);
                        break;

                      case 65476:
                        var huffmanLength = readUint16();
                        for (i = 2; i < huffmanLength; ) {
                            var huffmanTableSpec = data[offset++];
                            var codeLengths = new Uint8Array(16);
                            var codeLengthSum = 0;
                            for (j = 0; j < 16; j++, offset++) {
                                codeLengthSum += codeLengths[j] = data[offset];
                            }
                            var huffmanValues = new Uint8Array(codeLengthSum);
                            for (j = 0; j < codeLengthSum; j++, offset++) {
                                huffmanValues[j] = data[offset];
                            }
                            i += 17 + codeLengthSum;
                            (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
                        }
                        break;

                      case 65501:
                        readUint16();
                        resetInterval = readUint16();
                        break;

                      case 65498:
                        var scanLength = readUint16();
                        var selectorsCount = data[offset++];
                        var components = [], component;
                        for (i = 0; i < selectorsCount; i++) {
                            var componentIndex = frame.componentIds[data[offset++]];
                            component = frame.components[componentIndex];
                            var tableSpec = data[offset++];
                            component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
                            component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
                            components.push(component);
                        }
                        var spectralStart = data[offset++];
                        var spectralEnd = data[offset++];
                        var successiveApproximation = data[offset++];
                        var processed = decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15);
                        offset += processed;
                        break;

                      case 65535:
                        if (data[offset] !== 255) {
                            offset--;
                        }
                        break;

                      default:
                        if (data[offset - 3] === 255 && data[offset - 2] >= 192 && data[offset - 2] <= 254) {
                            offset -= 3;
                            break;
                        }
                        throw "unknown JPEG marker " + fileMarker.toString(16);
                    }
                    fileMarker = readUint16();
                }
                this.width = frame.samplesPerLine;
                this.height = frame.scanLines;
                this.jfif = jfif;
                this.adobe = adobe;
                this.components = [];
                for (i = 0; i < frame.components.length; i++) {
                    component = frame.components[i];
                    this.components.push({
                        output: buildComponentData(frame, component),
                        scaleX: component.h / frame.maxH,
                        scaleY: component.v / frame.maxV,
                        blocksPerLine: component.blocksPerLine,
                        blocksPerColumn: component.blocksPerColumn
                    });
                }
                this.numComponents = this.components.length;
            },
            _getLinearizedBlockData: function getLinearizedBlockData(width, height) {
                var scaleX = this.width / width, scaleY = this.height / height;
                var component, componentScaleX, componentScaleY, blocksPerScanline;
                var x, y, i, j, k;
                var index;
                var offset = 0;
                var output;
                var numComponents = this.components.length;
                var dataLength = width * height * numComponents;
                var data = new Uint8Array(dataLength);
                var xScaleBlockOffset = new Uint32Array(width);
                var mask3LSB = 4294967288;
                for (i = 0; i < numComponents; i++) {
                    component = this.components[i];
                    componentScaleX = component.scaleX * scaleX;
                    componentScaleY = component.scaleY * scaleY;
                    offset = i;
                    output = component.output;
                    blocksPerScanline = component.blocksPerLine + 1 << 3;
                    for (x = 0; x < width; x++) {
                        j = 0 | x * componentScaleX;
                        xScaleBlockOffset[x] = (j & mask3LSB) << 3 | j & 7;
                    }
                    for (y = 0; y < height; y++) {
                        j = 0 | y * componentScaleY;
                        index = blocksPerScanline * (j & mask3LSB) | (j & 7) << 3;
                        for (x = 0; x < width; x++) {
                            data[offset] = output[index + xScaleBlockOffset[x]];
                            offset += numComponents;
                        }
                    }
                }
                var transform = this.decodeTransform;
                if (transform) {
                    for (i = 0; i < dataLength; ) {
                        for (j = 0, k = 0; j < numComponents; j++, i++, k += 2) {
                            data[i] = (data[i] * transform[k] >> 8) + transform[k + 1];
                        }
                    }
                }
                return data;
            },
            _isColorConversionNeeded: function isColorConversionNeeded() {
                if (this.adobe && this.adobe.transformCode) {
                    return true;
                } else if (this.numComponents === 3) {
                    return true;
                } else {
                    return false;
                }
            },
            _convertYccToRgb: function convertYccToRgb(data) {
                var Y, Cb, Cr;
                for (var i = 0, length = data.length; i < length; i += 3) {
                    Y = data[i];
                    Cb = data[i + 1];
                    Cr = data[i + 2];
                    data[i] = clamp0to255(Y - 179.456 + 1.402 * Cr);
                    data[i + 1] = clamp0to255(Y + 135.459 - .344 * Cb - .714 * Cr);
                    data[i + 2] = clamp0to255(Y - 226.816 + 1.772 * Cb);
                }
                return data;
            },
            _convertYcckToRgb: function convertYcckToRgb(data) {
                var Y, Cb, Cr, k;
                var offset = 0;
                for (var i = 0, length = data.length; i < length; i += 4) {
                    Y = data[i];
                    Cb = data[i + 1];
                    Cr = data[i + 2];
                    k = data[i + 3];
                    var r = -122.67195406894 + Cb * (-660635669420364e-19 * Cb + .000437130475926232 * Cr - 54080610064599e-18 * Y + .00048449797120281 * k - .154362151871126) + Cr * (-.000957964378445773 * Cr + .000817076911346625 * Y - .00477271405408747 * k + 1.53380253221734) + Y * (.000961250184130688 * Y - .00266257332283933 * k + .48357088451265) + k * (-.000336197177618394 * k + .484791561490776);
                    var g = 107.268039397724 + Cb * (219927104525741e-19 * Cb - .000640992018297945 * Cr + .000659397001245577 * Y + .000426105652938837 * k - .176491792462875) + Cr * (-.000778269941513683 * Cr + .00130872261408275 * Y + .000770482631801132 * k - .151051492775562) + Y * (.00126935368114843 * Y - .00265090189010898 * k + .25802910206845) + k * (-.000318913117588328 * k - .213742400323665);
                    var b = -20.810012546947 + Cb * (-.000570115196973677 * Cb - 263409051004589e-19 * Cr + .0020741088115012 * Y - .00288260236853442 * k + .814272968359295) + Cr * (-153496057440975e-19 * Cr - .000132689043961446 * Y + .000560833691242812 * k - .195152027534049) + Y * (.00174418132927582 * Y - .00255243321439347 * k + .116935020465145) + k * (-.000343531996510555 * k + .24165260232407);
                    data[offset++] = clamp0to255(r);
                    data[offset++] = clamp0to255(g);
                    data[offset++] = clamp0to255(b);
                }
                return data;
            },
            _convertYcckToCmyk: function convertYcckToCmyk(data) {
                var Y, Cb, Cr;
                for (var i = 0, length = data.length; i < length; i += 4) {
                    Y = data[i];
                    Cb = data[i + 1];
                    Cr = data[i + 2];
                    data[i] = clamp0to255(434.456 - Y - 1.402 * Cr);
                    data[i + 1] = clamp0to255(119.541 - Y + .344 * Cb + .714 * Cr);
                    data[i + 2] = clamp0to255(481.816 - Y - 1.772 * Cb);
                }
                return data;
            },
            _convertCmykToRgb: function convertCmykToRgb(data) {
                var c, m, y, k;
                var offset = 0;
                var min = -255 * 255 * 255;
                var scale = 1 / 255 / 255;
                for (var i = 0, length = data.length; i < length; i += 4) {
                    c = data[i];
                    m = data[i + 1];
                    y = data[i + 2];
                    k = data[i + 3];
                    var r = c * (-4.387332384609988 * c + 54.48615194189176 * m + 18.82290502165302 * y + 212.25662451639585 * k - 72734.4411664936) + m * (1.7149763477362134 * m - 5.6096736904047315 * y - 17.873870861415444 * k - 1401.7366389350734) + y * (-2.5217340131683033 * y - 21.248923337353073 * k + 4465.541406466231) - k * (21.86122147463605 * k + 48317.86113160301);
                    var g = c * (8.841041422036149 * c + 60.118027045597366 * m + 6.871425592049007 * y + 31.159100130055922 * k - 20220.756542821975) + m * (-15.310361306967817 * m + 17.575251261109482 * y + 131.35250912493976 * k - 48691.05921601825) + y * (4.444339102852739 * y + 9.8632861493405 * k - 6341.191035517494) - k * (20.737325471181034 * k + 47890.15695978492);
                    var b = c * (.8842522430003296 * c + 8.078677503112928 * m + 30.89978309703729 * y - .23883238689178934 * k - 3616.812083916688) + m * (10.49593273432072 * m + 63.02378494754052 * y + 50.606957656360734 * k - 28620.90484698408) + y * (.03296041114873217 * y + 115.60384449646641 * k - 49363.43385999684) - k * (22.33816807309886 * k + 45932.16563550634);
                    data[offset++] = r >= 0 ? 255 : r <= min ? 0 : 255 + r * scale | 0;
                    data[offset++] = g >= 0 ? 255 : g <= min ? 0 : 255 + g * scale | 0;
                    data[offset++] = b >= 0 ? 255 : b <= min ? 0 : 255 + b * scale | 0;
                }
                return data;
            },
            getData: function getData(width, height, forceRGBoutput) {
                if (this.numComponents > 4) {
                    throw "Unsupported color mode";
                }
                var data = this._getLinearizedBlockData(width, height);
                if (this.numComponents === 3) {
                    return this._convertYccToRgb(data);
                } else if (this.numComponents === 4) {
                    if (this._isColorConversionNeeded()) {
                        if (forceRGBoutput) {
                            return this._convertYcckToRgb(data);
                        } else {
                            return this._convertYcckToCmyk(data);
                        }
                    } else if (forceRGBoutput) {
                        return this._convertCmykToRgb(data);
                    }
                }
                return data;
            }
        };
        return constructor;
    }();
    "use strict";
    var ArithmeticDecoder = function ArithmeticDecoderClosure() {
        var QeTable = [ {
            qe: 22017,
            nmps: 1,
            nlps: 1,
            switchFlag: 1
        }, {
            qe: 13313,
            nmps: 2,
            nlps: 6,
            switchFlag: 0
        }, {
            qe: 6145,
            nmps: 3,
            nlps: 9,
            switchFlag: 0
        }, {
            qe: 2753,
            nmps: 4,
            nlps: 12,
            switchFlag: 0
        }, {
            qe: 1313,
            nmps: 5,
            nlps: 29,
            switchFlag: 0
        }, {
            qe: 545,
            nmps: 38,
            nlps: 33,
            switchFlag: 0
        }, {
            qe: 22017,
            nmps: 7,
            nlps: 6,
            switchFlag: 1
        }, {
            qe: 21505,
            nmps: 8,
            nlps: 14,
            switchFlag: 0
        }, {
            qe: 18433,
            nmps: 9,
            nlps: 14,
            switchFlag: 0
        }, {
            qe: 14337,
            nmps: 10,
            nlps: 14,
            switchFlag: 0
        }, {
            qe: 12289,
            nmps: 11,
            nlps: 17,
            switchFlag: 0
        }, {
            qe: 9217,
            nmps: 12,
            nlps: 18,
            switchFlag: 0
        }, {
            qe: 7169,
            nmps: 13,
            nlps: 20,
            switchFlag: 0
        }, {
            qe: 5633,
            nmps: 29,
            nlps: 21,
            switchFlag: 0
        }, {
            qe: 22017,
            nmps: 15,
            nlps: 14,
            switchFlag: 1
        }, {
            qe: 21505,
            nmps: 16,
            nlps: 14,
            switchFlag: 0
        }, {
            qe: 20737,
            nmps: 17,
            nlps: 15,
            switchFlag: 0
        }, {
            qe: 18433,
            nmps: 18,
            nlps: 16,
            switchFlag: 0
        }, {
            qe: 14337,
            nmps: 19,
            nlps: 17,
            switchFlag: 0
        }, {
            qe: 13313,
            nmps: 20,
            nlps: 18,
            switchFlag: 0
        }, {
            qe: 12289,
            nmps: 21,
            nlps: 19,
            switchFlag: 0
        }, {
            qe: 10241,
            nmps: 22,
            nlps: 19,
            switchFlag: 0
        }, {
            qe: 9217,
            nmps: 23,
            nlps: 20,
            switchFlag: 0
        }, {
            qe: 8705,
            nmps: 24,
            nlps: 21,
            switchFlag: 0
        }, {
            qe: 7169,
            nmps: 25,
            nlps: 22,
            switchFlag: 0
        }, {
            qe: 6145,
            nmps: 26,
            nlps: 23,
            switchFlag: 0
        }, {
            qe: 5633,
            nmps: 27,
            nlps: 24,
            switchFlag: 0
        }, {
            qe: 5121,
            nmps: 28,
            nlps: 25,
            switchFlag: 0
        }, {
            qe: 4609,
            nmps: 29,
            nlps: 26,
            switchFlag: 0
        }, {
            qe: 4353,
            nmps: 30,
            nlps: 27,
            switchFlag: 0
        }, {
            qe: 2753,
            nmps: 31,
            nlps: 28,
            switchFlag: 0
        }, {
            qe: 2497,
            nmps: 32,
            nlps: 29,
            switchFlag: 0
        }, {
            qe: 2209,
            nmps: 33,
            nlps: 30,
            switchFlag: 0
        }, {
            qe: 1313,
            nmps: 34,
            nlps: 31,
            switchFlag: 0
        }, {
            qe: 1089,
            nmps: 35,
            nlps: 32,
            switchFlag: 0
        }, {
            qe: 673,
            nmps: 36,
            nlps: 33,
            switchFlag: 0
        }, {
            qe: 545,
            nmps: 37,
            nlps: 34,
            switchFlag: 0
        }, {
            qe: 321,
            nmps: 38,
            nlps: 35,
            switchFlag: 0
        }, {
            qe: 273,
            nmps: 39,
            nlps: 36,
            switchFlag: 0
        }, {
            qe: 133,
            nmps: 40,
            nlps: 37,
            switchFlag: 0
        }, {
            qe: 73,
            nmps: 41,
            nlps: 38,
            switchFlag: 0
        }, {
            qe: 37,
            nmps: 42,
            nlps: 39,
            switchFlag: 0
        }, {
            qe: 21,
            nmps: 43,
            nlps: 40,
            switchFlag: 0
        }, {
            qe: 9,
            nmps: 44,
            nlps: 41,
            switchFlag: 0
        }, {
            qe: 5,
            nmps: 45,
            nlps: 42,
            switchFlag: 0
        }, {
            qe: 1,
            nmps: 45,
            nlps: 43,
            switchFlag: 0
        }, {
            qe: 22017,
            nmps: 46,
            nlps: 46,
            switchFlag: 0
        } ];
        function ArithmeticDecoder(data, start, end) {
            this.data = data;
            this.bp = start;
            this.dataEnd = end;
            this.chigh = data[start];
            this.clow = 0;
            this.byteIn();
            this.chigh = this.chigh << 7 & 65535 | this.clow >> 9 & 127;
            this.clow = this.clow << 7 & 65535;
            this.ct -= 7;
            this.a = 32768;
        }
        ArithmeticDecoder.prototype = {
            byteIn: function ArithmeticDecoder_byteIn() {
                var data = this.data;
                var bp = this.bp;
                if (data[bp] === 255) {
                    var b1 = data[bp + 1];
                    if (b1 > 143) {
                        this.clow += 65280;
                        this.ct = 8;
                    } else {
                        bp++;
                        this.clow += data[bp] << 9;
                        this.ct = 7;
                        this.bp = bp;
                    }
                } else {
                    bp++;
                    this.clow += bp < this.dataEnd ? data[bp] << 8 : 65280;
                    this.ct = 8;
                    this.bp = bp;
                }
                if (this.clow > 65535) {
                    this.chigh += this.clow >> 16;
                    this.clow &= 65535;
                }
            },
            readBit: function ArithmeticDecoder_readBit(contexts, pos) {
                var cx_index = contexts[pos] >> 1, cx_mps = contexts[pos] & 1;
                var qeTableIcx = QeTable[cx_index];
                var qeIcx = qeTableIcx.qe;
                var d;
                var a = this.a - qeIcx;
                if (this.chigh < qeIcx) {
                    if (a < qeIcx) {
                        a = qeIcx;
                        d = cx_mps;
                        cx_index = qeTableIcx.nmps;
                    } else {
                        a = qeIcx;
                        d = 1 ^ cx_mps;
                        if (qeTableIcx.switchFlag === 1) {
                            cx_mps = d;
                        }
                        cx_index = qeTableIcx.nlps;
                    }
                } else {
                    this.chigh -= qeIcx;
                    if ((a & 32768) !== 0) {
                        this.a = a;
                        return cx_mps;
                    }
                    if (a < qeIcx) {
                        d = 1 ^ cx_mps;
                        if (qeTableIcx.switchFlag === 1) {
                            cx_mps = d;
                        }
                        cx_index = qeTableIcx.nlps;
                    } else {
                        d = cx_mps;
                        cx_index = qeTableIcx.nmps;
                    }
                }
                do {
                    if (this.ct === 0) {
                        this.byteIn();
                    }
                    a <<= 1;
                    this.chigh = this.chigh << 1 & 65535 | this.clow >> 15 & 1;
                    this.clow = this.clow << 1 & 65535;
                    this.ct--;
                } while ((a & 32768) === 0);
                this.a = a;
                contexts[pos] = cx_index << 1 | cx_mps;
                return d;
            }
        };
        return ArithmeticDecoder;
    }();
    "use strict";
    function log2(x) {
        var n = 1, i = 0;
        while (x > n) {
            n <<= 1;
            i++;
        }
        return i;
    }
    function readInt8(data, start) {
        return data[start] << 24 >> 24;
    }
    function readUint16(data, offset) {
        return data[offset] << 8 | data[offset + 1];
    }
    function readUint32(data, offset) {
        return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
    }
    function shadow(obj, prop, value) {
        Object.defineProperty(obj, prop, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: false
        });
        return value;
    }
    var error = function() {
        console.error.apply(console, arguments);
        throw new Error("PDFJS error: " + arguments[0]);
    };
    var warn = function() {
        console.warn.apply(console, arguments);
    };
    var info = function() {
        console.info.apply(console, arguments);
    };
    PDFJS.JpegImage = JpegImage;
})(PDFJS || (PDFJS = {}));

var JpegDecoder = PDFJS.JpegImage;


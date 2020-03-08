g_db.quests[25]={id:25,name:"^ffffffOrphan Girl's Tears",type:0,trigger_policy:3,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:0,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:31,show_quest_title:1,show_as_gold_quest:0,start_npc:2281,finish_npc:0,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:150,level_max:150,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:0,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:1,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:0,req_npc_type:0,briefing:"Yue is a teenage girl who used to live with her dad in Archosaur. Unfortunately, her father passed away recently and she has sunken into a deep depression. She was so poor that she could not even afford to pay for her father's funeral service. To try and make ends meet, she sold her most valuable jade bracelet. Yue's dad appeared in her dream one night and scolded her for selling the family heirloom. This has shaken Yue even more. Is there anyone who can help her?\n",text:"Yue is a teenage girl who used to live with her dad in Archosaur. Unfortunately, her father passed away recently and she has sunken into a deep depression. She was so poor that she could not even afford to pay for her father's funeral service. To try and make ends meet, she sold her most valuable jade bracelet. Yue's dad appeared in her dream one night and scolded her for selling the family heirloom. This has shaken Yue even more. Is there anyone who can help her?\n",parent_quest:0,previous_quest:0,next_quest:0,sub_quest_first:100,dialogue:{initial:{id:73,questions:[{id:1,id_parent:4294967295,text:"The world is full of its own interpretations. Who can understand my bitterness. ",choices:[{id:2,text:"My lady, why do you look so full of sorrow?",param:0,},]},{id:2,id_parent:1,text:"My father and I have been depending on each other since my childhood. Unfortunately, Dad died of some disease- leaving me alone. I was so poor then that I couldn't afford to bury him. I sold my family's jade bracelet which has been passed down through generations. But...several days ago, I saw Dad in my dream. He blamed me for selling the family heirloom. I really did something unforgivable...",choices:[{id:3,text:"To whom did you sell the jade bracelet?",param:0,},{id:2147483666,text:"I can do nothing. I sold it fair and square.",param:0,},]},{id:3,id_parent:2,text:"I sold the Jade bracelet to one of this city's merchants. After Dad's burial, I had nothing left. I have to save whenever I can. I hope one day I can buy that bracelet back. ",choices:[{id:2147483654,text:"I'll talk to him.",param:25,},]},},unfinished:{id:74,questions:[{id:1,id_parent:4294967295,text:"Forgive me father...I have done something awful. ",choices:[{id:2147483648,text:"I'll find your jade bracelet.",param:25,},]},},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[
{id:100,name:"^ffffffAsk the Merchant",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:2212,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:0,premise_coins:0,dontshow_without_premise_coins:0,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:0,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:0,req_faction_role:0,dontshow_without_req_faction_role:0,req_gender:0,dontshow_wrong_gender:0,req_class:0,dontshow_wrong_class:0,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:3,req_npc_type:1,briefing:"Go to Archosaur and find a ^d0d000merchant^ffffff to help Yue to get her jade bracelet back.",parent_quest:25,previous_quest:0,next_quest:104,sub_quest_first:0,dialogue:{finish:{id:75,questions:[{id:1,id_parent:4294967295,text:"I have numerous goods for sale here. You can have whatever you seek, for a price. ",choices:[{id:2,text:"I heard that a woman named Yue sold you a jade bracelet...",param:0,},]},{id:2,id_parent:1,text:"Yue is really a nice girl. Too bad she is cursed. The jade bracelet? Yes. She did sell a bracelet to me. But it has already been bought by someone else.",choices:[{id:3,text:"What? To whom did you sell it?",param:0,},]},{id:3,id_parent:2,text:"Yesterday a traveling merchant came here. One look at that bracelet and he went mad for it. He bought it at high price. Umm...yes, he metioned he was on his way to  Etherblade when he was leaving. Hurry! Maybe you can meet him there.",choices:[{id:2147483655,text:"I'm going.",param:100,},]},},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},
{id:104,name:"^ffffffFind the Vendor",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:2282,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:0,premise_coins:0,dontshow_without_premise_coins:0,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:0,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:0,req_faction_role:0,dontshow_without_req_faction_role:0,req_gender:0,dontshow_wrong_gender:0,req_class:0,dontshow_wrong_class:0,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:3,req_npc_type:1,briefing:"Go to ^d0d000Etherblade^ffffff to search for the Traveling Vendor who bought the ^d0d000jade bracelet^ffffff.",parent_quest:25,previous_quest:100,next_quest:111,sub_quest_first:0,dialogue:{finish:{id:77,questions:[{id:1,id_parent:4294967295,text:"A man without ambition is just a blob of walking meat. My ambition is to travel the world and collect its great treasures.",choices:[{id:2,text:"Can you sell me the Bracelet that you bought from the Merchant?",param:0,},]},{id:2,id_parent:1,text:"The jade bracelet? Yes it's here with me. But...I really paid a lot of money for it...you see, they say trades gotta be fair...",choices:[{id:3,text:"Ok, name your price.",param:0,},]},{id:3,id_parent:2,text:"You misunderstood me, I'm not making money out of you, hee hee...I just need you to do me a favor. Yesterday when I was passing the Tomb of the Shining Tide, some Lanterns chased me. Lucky I ran really fast enough to get away. But I lost my Rose Gold Gourd in the process. I suppose it was taken by those monsters. If you can get my gourd back, I'll give you the jade bracelet. Fair enough?",choices:[{id:2147483655,text:"It's a deal.",param:104,},]},},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},
{id:111,name:"^ffffffRose Gold Gourd",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:2282,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:0,premise_coins:0,dontshow_without_premise_coins:0,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:0,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:0,req_faction_role:0,dontshow_without_req_faction_role:0,req_gender:0,dontshow_wrong_gender:0,req_class:0,dontshow_wrong_class:0,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:1,req_npc_type:1,briefing:"Grab the ^d0d000Rose Gold Gourd^ffffff from the Lantern of Protection outside the ^d0d000Tomb of the Shining Tide^ffffff and give it to the ^d0d000Traveling Merchant^ffffff in ^d0d000Etherblade^ffffff.",parent_quest:25,previous_quest:104,next_quest:116,sub_quest_first:0,dialogue:{finish:{id:81,questions:[{id:1,id_parent:4294967295,text:"Find the rose gold gourd?",choices:[{id:2,text:"Is this what you want?",param:0,},]},{id:2,id_parent:1,text:"Ah yes! This is it! Oh my rose gold gourd, you are finally back, fabulous, ha ha ha... This is your jade bracelet. I'm at great loss in this trade...",choices:[{id:3,text:"So...what about we exchange them back?",param:0,},]},{id:3,id_parent:2,text:"Kidding, just kidding. See ya later, buddy.",choices:[{id:2147483655,text:"Ha ha ha...",param:111,},]},},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[{chosen_randomly:0,items:[{id:2373,is_common:0,amount:1,probability:1.00000000,},]},],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},
{id:116,name:"^ffffffReturn the Bracelet",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:2281,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:0,premise_coins:0,dontshow_without_premise_coins:0,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:0,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:0,req_faction_role:0,dontshow_without_req_faction_role:0,req_gender:0,dontshow_wrong_gender:0,req_class:0,dontshow_wrong_class:0,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:2,req_npc_type:1,briefing:"Return the jade bracelet to ^d0d000Yue^ffffff in ^d0d000Archosaur^ffffff.",parent_quest:25,previous_quest:111,next_quest:0,sub_quest_first:0,dialogue:{finish:{id:82,questions:[{id:1,id_parent:4294967295,text:"Forgive me father...I have done something awful. ",choices:[{id:2,text:"Lady, I have your jade bracelet here.",param:0,},]},{id:2,id_parent:1,text:"The jade bracelet! I must be dreaming! I thought I would never see it again! I really don't know how to thank you.",choices:[{id:2147483655,text:"Don't mention it. ",param:116,},]},},},on_success:{normal:{xp:800,sp:800,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},]};

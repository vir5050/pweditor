g_db.quests[2727]={id:2727,name:"^ffffffPerfect Wish",type:0,trigger_policy:3,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:0,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:2306,finish_npc:0,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:17,level_max:40,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[526,],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:3,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:0,req_npc_type:0,briefing:"Please help the old chief with his love.",parent_quest:0,previous_quest:0,next_quest:0,sub_quest_first:2917,dialogue:{initial:{id:3001,questions:[{id:1,id_parent:4294967295,text:"Can you do me a favor?",choices:[{id:2,text:"What can I do for you, sir?",param:0,},]},{id:2,id_parent:1,text:"Withered Dryad has captured Yaling's soul beside the Everflow. A mob of monsters are also there watching her. Can you rescue her and bring her soul back?",choices:[{id:2147483654,text:"I'll deal with it.",param:2727,},{id:2147483666,text:"Well...I'm not strong enough to face it.",param:0,},]},},},on_success:{normal:{xp:6750,sp:1500,coins:4050,rep:2,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[{chosen_randomly:1,items:[{id:3368,is_common:1,amount:1,probability:0.10000000,},{id:3369,is_common:1,amount:1,probability:0.10000000,},{id:3370,is_common:1,amount:1,probability:0.10000000,},{id:3366,is_common:1,amount:1,probability:0.69999999,},]},],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[
{id:2917,name:"^ffffffWithered Dryad",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:2306,is_craft_skill_quest:0,can_be_found:0,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:0,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:1,recv_in_team_only:0,req_success_type:1,req_npc_type:1,briefing:"Go to the Everflow and slay the Withered Dryad to save Yaling's Soul.",parent_quest:2727,previous_quest:0,next_quest:2918,sub_quest_first:0,dialogue:{finish:{id:3002,questions:[{id:1,id_parent:4294967295,text:"Wait a second, can you do me one more favor?",choices:[{id:2,text:"No problem. What can I do for you?",param:0,},]},{id:2,id_parent:1,text:"Please plead with the Sage at the cliff of Haunted Path for a Revival Herb.",choices:[{id:5,text:"That shall be done. Just wait here, I'll be back soon.",param:0,},]},{id:5,id_parent:2,text:"Go northeast to the Haunted Path and talk to the Sage there.",choices:[{id:2147483655,text:"N/A",param:2917,},]},},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},
{id:2918,name:"^ffffffHaunted Path",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:3897,is_craft_skill_quest:0,can_be_found:0,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:0,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:3,req_npc_type:1,briefing:"Go to the cliff west of Tai Chi Shore and ask the Taoist for a Revival Herb.",parent_quest:2727,previous_quest:2917,next_quest:2948,sub_quest_first:0,dialogue:{finish:{id:3003,questions:[{id:1,id_parent:4294967295,text:"What can I do for you?",choices:[{id:2,text:"(You tell him the story of the old chief...)",param:0,},]},{id:2,id_parent:1,text:"That's touching... Take this Revival Herb.",choices:[{id:10,text:"Thank you!",param:0,},]},{id:10,id_parent:2,text:"This is Revival Herb. She can revive by taking this herb. But there must be something wrong here.\n",choices:[{id:11,text:"What is it then?",param:0,},]},{id:11,id_parent:10,text:"How old was Yaling when she died?",choices:[{id:12,text:"Well, about 20 years old.",param:0,},]},{id:12,id_parent:11,text:"Then how old is the old chief now?",choices:[{id:13,text:"I see. Can the old chief be rejuvenated?",param:0,},]},{id:13,id_parent:12,text:"Please bring me 10 Evergreen Fruits.",choices:[{id:14,text:"Where can I find them?",param:0,},]},{id:14,id_parent:13,text:"You can get them from Demonic Sporopods here.",choices:[{id:2147483655,text:"Ok, I'll go.",param:2918,},]},},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[{chosen_randomly:0,items:[{id:8850,is_common:0,amount:1,probability:1.00000000,},]},],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},
{id:2948,name:"^ffffffEvergreen Fruit",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:3897,is_craft_skill_quest:0,can_be_found:0,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:0,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:1,recv_in_team_only:0,req_success_type:1,req_npc_type:1,briefing:"Go to the cliff west of Tai Chi Shore and kill  Demonic Sporopods to find 10 Evergreen Fruits. Then take them to Master Tsang.",parent_quest:2727,previous_quest:2918,next_quest:2949,sub_quest_first:0,dialogue:{finish:{id:3037,questions:[{id:1,id_parent:4294967295,text:"Great. I'll make you the rejuvenation potion.",choices:[{id:2147483655,text:"Thank you!",param:2948,},]},},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[{chosen_randomly:0,items:[{id:8852,is_common:0,amount:1,probability:1.00000000,},]},],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},
{id:2949,name:"^ffffffRomance Never Dies",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:1,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:2306,is_craft_skill_quest:0,can_be_found:0,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:0,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:2,req_npc_type:1,briefing:"Take the rejuvenation potion to the old chief.",parent_quest:2727,previous_quest:2948,next_quest:0,sub_quest_first:0,dialogue:{finish:{id:3038,questions:[{id:1,id_parent:4294967295,text:"Thank you very much!",choices:[{id:2147483655,text:"My pleasure.",param:2949,},]},},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},]};

g_db.quests[75]={id:75,name:"^ffffffCure the Injured",type:0,trigger_policy:3,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:0,can_retake_after_failure:1,on_fail_parent_fail:1,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:2,show_quest_title:1,show_as_gold_quest:0,start_npc:2162,finish_npc:0,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:2,level_max:5,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:3,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:1,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:0,req_npc_type:0,briefing:"Medicine is needed desperately for the injuired in Archosaur. You promised to help the Apothecary by bringing him 5 Young Scorpion Tails and 5 Wolfling Teeth.",parent_quest:0,previous_quest:0,next_quest:0,sub_quest_first:438,dialogue:{initial:{id:83,questions:[{id:1,id_parent:4294967295,text:"The main army of the Allied Force was defeated at the Emerald Dragon Gulf. Many injured soldiers have fallen back to Archosaur. Remedies are in dire need and I'm out of ingredients. Can you go find five Young Scorpion Tails and five Wolfling Teeth for me? They can be found among the corpses of Scorpion Pups and Mad Wolflings.\n",choices:[{id:2147483654,text:"It's an honor to help the wounded. I'll do it.",param:75,},{id:2147483666,text:"I'm a bad ingredients collector...",param:0,},]},]},notqualified:{id:414,questions:[{id:1,id_parent:4294967295,text:"No good ingredients have been these days... so sad...",choices:[{id:3,text:"I'll do that.",param:0,},]},{id:3,id_parent:1,text:"You? It's too dangerous for you now.",choices:[{id:2147483648,text:"So...",param:75,},]},]},unfinished:{id:85,questions:[{id:1,id_parent:4294967295,text:"",choices:[]},]},finish:{id:86,questions:[{id:1,id_parent:4294967295,text:"One minute's delay will mean the deaths of thousands of warriors. Please do it as fast as you can.",choices:[]},]},},on_success:{normal:{xp:100,sp:30,coins:60,rep:1,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[
{id:438,name:"^ffffffCollecting Herbs",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:0,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:0,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:0,premise_coins:0,dontshow_without_premise_coins:0,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:0,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:0,req_faction_role:0,dontshow_without_req_faction_role:0,req_gender:0,dontshow_wrong_gender:0,req_class:0,dontshow_wrong_class:0,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:0,req_npc_type:0,briefing:"Pick some ^ffcb4aHerbs^ffffff for the ^ffcb4aApothecary^ffffff.",parent_quest:75,previous_quest:0,next_quest:439,sub_quest_first:440,dialogue:{unfinished:{id:420,questions:[{id:1,id_parent:4294967295,text:"One minute's delay will mean the deaths of thousands of warriors. Please do it as fast as you can.",choices:[]},]},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[
{id:440,name:"^ffffffScorpion Pup",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:0,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:0,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:0,premise_coins:0,dontshow_without_premise_coins:0,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:0,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:0,req_faction_role:0,dontshow_without_req_faction_role:0,req_gender:0,dontshow_wrong_gender:0,req_class:0,dontshow_wrong_class:0,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:1,recv_in_team_only:0,req_success_type:1,req_npc_type:0,briefing:"Gather some ^ffcb4aYoung Scorpion Tails^ffffff from  ^ffcb4aScorpion Pups^ffffff. They can be found just outside the south entrance of Etherblade.",parent_quest:438,previous_quest:0,next_quest:441,sub_quest_first:0,dialogue:{unfinished:{id:1193,questions:[{id:1,id_parent:4294967295,text:"One minute's delay will mean the deaths of thousands of warriors. Please do it as fast as you can.",choices:[]},]},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},
{id:441,name:"^ffffffKill Mad Wolfling",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:0,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:0,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:0,premise_coins:0,dontshow_without_premise_coins:0,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:0,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:0,req_faction_role:0,dontshow_without_req_faction_role:0,req_gender:0,dontshow_wrong_gender:0,req_class:0,dontshow_wrong_class:0,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:1,recv_in_team_only:0,req_success_type:1,req_npc_type:0,briefing:"Get some ^ffcb4aWolfling Teeth^ffffff from ^ffcb4aMad Wolflings^ffffff. They can be found just outside the south entrance of Etherblade.",parent_quest:438,previous_quest:440,next_quest:0,sub_quest_first:0,dialogue:{unfinished:{id:1194,questions:[{id:1,id_parent:4294967295,text:"One minute's delay will mean the deaths of thousands of warriors. Please do it as fast as you can.",choices:[]},]},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},]},
{id:439,name:"^ffffffHerb Delivery",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:1,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:2162,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:0,premise_coins:0,dontshow_without_premise_coins:0,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:0,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:0,req_faction_role:0,dontshow_without_req_faction_role:0,req_gender:0,dontshow_wrong_gender:0,req_class:0,dontshow_wrong_class:0,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:2,req_npc_type:1,briefing:"Give the collected herbs to ^ffcb4aApothecary Sung^ffffff.",parent_quest:75,previous_quest:438,next_quest:0,sub_quest_first:0,dialogue:{finish:{id:407,questions:[{id:1,id_parent:4294967295,text:"Great! We can heal more injured soldiers now.",choices:[{id:2,text:"Potions can be made from this junk?",param:0,},]},{id:2,id_parent:1,text:"Of course. Many things in Perfect World cannot be obtained with coin. ",choices:[{id:2147483655,text:"I see.",param:439,},]},]},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[{chosen_randomly:1,items:[{id:3366,is_common:1,amount:1,probability:0.69999999,},{id:3368,is_common:1,amount:1,probability:0.10000000,},{id:3369,is_common:1,amount:1,probability:0.10000000,},{id:3370,is_common:1,amount:1,probability:0.10000000,},]},],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},]};

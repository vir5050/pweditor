g_db.quests[2845]={id:2845,name:"^ffffffBridge of Etherblade",type:0,trigger_policy:3,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:0,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:4488,finish_npc:0,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:150,level_max:150,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:0,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:0,req_npc_type:0,briefing:"Craftsman Fu in Etherblade City has heard about a girl confined by her father. What's wrong?",parent_quest:0,previous_quest:0,next_quest:0,sub_quest_first:2846,dialogue:{initial:{id:2908,questions:[{id:1,id_parent:4294967295,text:"There seems to be somebody on the covered brige in front of the waterfall. Some said she was the daughter of a rich guy. She was imprisoned there by her father.",choices:[{id:2,text:"Why?",param:0,},]},{id:2,id_parent:1,text:"I don't know the detail. If you want to help her, please go and check it out.\n",choices:[{id:2147483654,text:"Okay, I'll figure it out.",param:2845,},]},]},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[{chosen_randomly:1,items:[{id:3368,is_common:1,amount:1,probability:0.10000000,},{id:3369,is_common:1,amount:1,probability:0.10000000,},{id:3370,is_common:1,amount:1,probability:0.10000000,},{id:3366,is_common:1,amount:1,probability:0.69999999,},]},],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[
{id:2846,name:"^ffffffConfined Girl",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:0,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:0,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:3,req_npc_type:1,briefing:"Walk along the eastern range of Etherblade City and approach the covered bridge. Land on the roof, and go in with you leaping skills to see Beierh who was confined here.",parent_quest:2845,previous_quest:0,next_quest:2847,sub_quest_first:0,dialogue:{finish:{id:2909,questions:[{id:1,id_parent:4294967295,text:"Tell my father that I won't change my mind!",choices:[{id:2,text:"I'm not here for your father, just curious about your news.",param:0,},]},{id:2,id_parent:1,text:"Really? You are not sent by my father to persuade me to leave Lei Yi?",choices:[{id:3,text:"Lei Yi?! You mean the famous Untamed warrior?",param:0,},]},{id:3,id_parent:2,text:"Yes. We are of different races but we fall in love. We were cursed by the Abstinensor. The only remedy was hid in another covered bridge on the right side of the eastern mountain. Please get it for me.",choices:[{id:2147483655,text:"Accept.",param:2846,},{id:2147483666,text:"No.",param:0,},]},]},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},
{id:2847,name:"^ffffffRelieve Abstinensor",type:0,trigger_policy:0,on_give_up_parent_fail:1,on_success_parent_success:0,can_give_up:1,can_retake:1,can_retake_after_failure:1,on_fail_parent_fail:0,fail_on_death:0,simultaneous_player_limit:0,ai_trigger:0,ai_trigger_enable:0,auto_trigger:0,trigger_on_death:0,remove_obtained_items:1,recommended_level:0,show_quest_title:1,show_as_gold_quest:0,start_npc:0,finish_npc:0,is_craft_skill_quest:0,can_be_found:1,show_direction:1,level_min:0,level_max:0,dontshow_under_level_min:1,premise_coins:0,dontshow_without_premise_coins:1,req_reputation_min:0,req_reputation_max:0,dontshow_without_req_reputation:1,premise_quests:[],req_cultivation:0,dontshow_without_req_cultivation:1,req_faction_role:0,dontshow_without_req_faction_role:1,req_gender:0,dontshow_wrong_gender:1,req_class:0,dontshow_wrong_class:1,req_be_married:0,dontshow_without_marriage:0,req_be_gm:0,req_global_quest:0,req_global_quest_cond:0,quests_mutex:[],req_blacksmith_level:0,req_tailor_level:0,req_craftsman_level:0,req_apothecary_level:0,special_award_type:0,is_team_task:0,recv_in_team_only:0,req_success_type:2,req_npc_type:1,briefing:"Jump from the ridge of the covered bridge and find the remedy for Beierh.\n",parent_quest:2845,previous_quest:2846,next_quest:0,sub_quest_first:0,dialogue:{finish:{id:2911,questions:[{id:1,id_parent:4294967295,text:"You did it! Well done! After I take the Remedy to Deceit Curse, Lei Yi can recover. Thank you for your kindness!\n",choices:[{id:2147483655,text:"You are welcome.",param:2847,},]},]},},on_success:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},on_failure:{normal:{xp:0,sp:0,coins:0,rep:0,culti:0,chi:0,level_multiplier:0,new_waypoint:0,storage_slots:0,inventory_slots:0,petbag_slots:0,ai_trigger:0,ai_trigger_enable:0,divorce:0,item_groups:[],},by_time:[],by_item_cnt:[],},children:[]},]};

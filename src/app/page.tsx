"use client";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ExternalLink, 
  TrendingDown, 
  DollarSign, 
  MapPin, 
  AlertTriangle,
  Filter,
  Ban,
  Trophy,
  Menu,
  X,
  Target,
  Briefcase,
  Percent,
  ArrowRight,
  Zap
} from "lucide-react";

// ------------------------------------------------------------------
// 1. PASTE YOUR DATA HERE (THE LONG LIST FROM COLAB)
// ------------------------------------------------------------------
const ZOMBIE_DATA = [{"state": "AL", "name": "Montgomery Area Zoological Society Inc", "assets_display": "$2,657,877", "spending_rate_display": "8.57%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_03_2024_prefixes_41-54%2F510193586_202309_990_2024031222311581.pdf"}, {"state": "AL", "name": "The Mississippi Animal Rescue League Charitable Trust", "assets_display": "$1,125,116", "spending_rate_display": "6.26%", "pdf_link": null}, {"state": "AL", "name": "Birmingham Botanical Society Inc", "assets_display": "$24,466,962", "spending_rate_display": "9.98%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F630495111_202312_990_2024071222683695.pdf"}, {"state": "AZ", "name": "Percival Lowell Trust Uw", "assets_display": "$37,590,223", "spending_rate_display": "1.20%", "pdf_link": null}, {"state": "AZ", "name": "Desert Botanical Garden Foundation", "assets_display": "$16,559,980", "spending_rate_display": "4.99%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_03_2024_prefixes_20-27%2F263305761_202309_990_2024030522309898.pdf"}, {"state": "AR", "name": "Arkansas Animal Rescue Foundationinc", "assets_display": "$16,487,901", "spending_rate_display": "4.95%", "pdf_link": null}, {"state": "CA", "name": "Redwood Forest Foundation Inc", "assets_display": "$89,469,598", "spending_rate_display": "7.39%", "pdf_link": null}, {"state": "CA", "name": "Rivian Foundation", "assets_display": "$24,797,657", "spending_rate_display": "0.76%", "pdf_link": null}, {"state": "CA", "name": "Christensen Fund", "assets_display": "$315,696,871", "spending_rate_display": "7.20%", "pdf_link": null}, {"state": "CA", "name": "Peninsula Open Space Trust", "assets_display": "$336,966,025", "spending_rate_display": "8.61%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F942392007_202306_990_2024062122566831.pdf"}, {"state": "CO", "name": "Ahimsa Foundation", "assets_display": "$938,177,008", "spending_rate_display": "8.59%", "pdf_link": null}, {"state": "CO", "name": "Colorado Clean Energy Fund", "assets_display": "$35,680,608", "spending_rate_display": "5.59%", "pdf_link": null}, {"state": "CO", "name": "Denver Botanic Gardens Endowment Inc", "assets_display": "$47,180,636", "spending_rate_display": "3.17%", "pdf_link": null}, {"state": "CT", "name": "Connecticut Humane Society", "assets_display": "$110,067,935", "spending_rate_display": "9.12%", "pdf_link": null}, {"state": "CT", "name": "Stamford Land Conservation Trust Inc", "assets_display": "$54,130,926", "spending_rate_display": "0.12%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F237169603_202312_990_2024061122523746.pdf"}, {"state": "CT", "name": "Environmental Learning Centers Of Connecticut Inc", "assets_display": "$14,378,374", "spending_rate_display": "7.02%", "pdf_link": null}, {"state": "CT", "name": "The Connecticut Audubon Society Incorporated", "assets_display": "$65,460,210", "spending_rate_display": "7.94%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F060653531_202304_990_2024040522344593.pdf"}, {"state": "CT", "name": "Newtown Forest Association Inc", "assets_display": "$7,354,979", "spending_rate_display": "2.65%", "pdf_link": null}, {"state": "CT", "name": "Lyme Land Conservation Trust Inc", "assets_display": "$10,887,257", "spending_rate_display": "2.65%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_05_2024_prefixes_06-16%2F066085183_202306_990_2024050722384318.pdf"}, {"state": "CT", "name": "Ct Energy Efficiency Finance Company", "assets_display": "$44,941,710", "spending_rate_display": "7.28%", "pdf_link": null}, {"state": "CT", "name": "Joshuas Tract Conservation & Historic Trust", "assets_display": "$17,583,217", "spending_rate_display": "3.10%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_02_2024_prefixes_01-13%2F066087579_202306_990_2024022022293586.pdf"}, {"state": "CT", "name": "Steep Rock Association Inc", "assets_display": "$26,024,509", "spending_rate_display": "3.81%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_02_2024_prefixes_01-13%2F066069060_202309_990_2024022022296893.pdf"}, {"state": "DE", "name": "Climate Arc Inc", "assets_display": "$2,601,589", "spending_rate_display": "0.32%", "pdf_link": null}, {"state": "CT", "name": "Ayers Wild Cat Conservation Tr", "assets_display": "$38,833,552", "spending_rate_display": "2.41%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F836391580_202312_990PF_2024060322467732.pdf"}, {"state": "CT", "name": "Flanders Nature Center Inc Van Vleck Farm", "assets_display": "$12,226,016", "spending_rate_display": "8.67%", "pdf_link": null}, {"state": "DE", "name": "Delaware Nature Society Inc", "assets_display": "$51,147,493", "spending_rate_display": "9.54%", "pdf_link": null}, {"state": "DE", "name": "Sussex Land Foundation Inc", "assets_display": "$7,593,516", "spending_rate_display": "3.86%", "pdf_link": null}, {"state": "DE", "name": "Harry C Green Residuary Tr Ua 01271993", "assets_display": "$7,265,405", "spending_rate_display": "5.09%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F207058117_202312_990_2024061122522967.pdf"}, {"state": "DE", "name": "Sunya Inc", "assets_display": "$3,501,730", "spending_rate_display": "8.46%", "pdf_link": null}, {"state": "DE", "name": "Havanese Rescue Inc", "assets_display": "$1,533,385", "spending_rate_display": "4.77%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F201343696_202312_990_2024061122519601.pdf"}, {"state": "DE", "name": "Sky Foundation", "assets_display": "$10,165,846", "spending_rate_display": "4.81%", "pdf_link": null}, {"state": "DC", "name": "Climate And Clean Energy Equity Fund", "assets_display": "$38,724,325", "spending_rate_display": "2.15%", "pdf_link": null}, {"state": "FL", "name": "Mds Famly Foundation Inc", "assets_display": "$31,333,181", "spending_rate_display": "0.27%", "pdf_link": null}, {"state": "FL", "name": "Edward E Hadddock Jr Family Operating Foundation", "assets_display": "$29,301,613", "spending_rate_display": "0.59%", "pdf_link": null}, {"state": "FL", "name": "Alachua Conservation Trust Incorporated", "assets_display": "$34,133,475", "spending_rate_display": "7.75%", "pdf_link": null}, {"state": "FL", "name": "Indian River Land Tr Inc", "assets_display": "$31,187,395", "spending_rate_display": "3.53%", "pdf_link": null}, {"state": "GA", "name": "Georgia Aquarium Foundation Inc", "assets_display": "$80,661,963", "spending_rate_display": "2.97%", "pdf_link": null}, {"state": "GA", "name": "Green South Foundation Inc", "assets_display": "$22,930,861", "spending_rate_display": "8.85%", "pdf_link": null}, {"state": "KS", "name": "Ghost Lake Corporation", "assets_display": "$18,807,201", "spending_rate_display": "5.20%", "pdf_link": null}, {"state": "KS", "name": "Humane Society Of The High Plains", "assets_display": "$7,012,364", "spending_rate_display": "5.98%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F480854139_202312_990_2024071222684137.pdf"}, {"state": "KS", "name": "Chester Edwin Nash And Mary Nash Charitable Foundation", "assets_display": "$6,968,543", "spending_rate_display": "6.18%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F736331357_202312_990PF_2024060322469056.pdf"}, {"state": "KY", "name": "Clean Streams Foundation Inc", "assets_display": "$195,601,044", "spending_rate_display": "4.02%", "pdf_link": null}, {"state": "KY", "name": "Fort Campbell Historical Foundation Inc", "assets_display": "$32,532,416", "spending_rate_display": "2.82%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F621516963_202312_990_2024061122513765.pdf"}, {"state": "KY", "name": "Kentucky Natural Lands Trust Inc", "assets_display": "$27,454,138", "spending_rate_display": "9.20%", "pdf_link": null}, {"state": "KY", "name": "Isaac W Bernheim Foundation Inc", "assets_display": "$66,664,444", "spending_rate_display": "7.88%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_01_2024_prefixes_58-61%2F610444651_202302_990_2024011722248987.pdf"}, {"state": "KY", "name": "Gardner Crenshaw Foundation", "assets_display": "$10,302,526", "spending_rate_display": "0.43%", "pdf_link": null}, {"state": "KS", "name": "Audubon Of Kansas Inc", "assets_display": "$6,137,866", "spending_rate_display": "7.22%", "pdf_link": null}, {"state": "KY", "name": "Yew Dell Inc", "assets_display": "$24,605,742", "spending_rate_display": "6.77%", "pdf_link": null}, {"state": "KY", "name": "Louisville Zoo Foundation Inc", "assets_display": "$21,207,886", "spending_rate_display": "2.86%", "pdf_link": null}, {"state": "LA", "name": "Audubon Nature Institute Foundation", "assets_display": "$30,911,414", "spending_rate_display": "6.46%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_02_2024_prefixes_52-58%2F581958248_202212_990_2024022022297054.pdf"}, {"state": "LA", "name": "Marion Willoughby Foundation For The Care Of Animals Inc", "assets_display": "$2,147,837", "spending_rate_display": "6.96%", "pdf_link": null}, {"state": "KY", "name": "Franklin County Humane Society Inc", "assets_display": "$7,317,341", "spending_rate_display": "9.10%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F610498423_202306_990_2024062122570581.pdf"}, {"state": "KY", "name": "Appalachian Wildlife Foundation", "assets_display": "$52,294,056", "spending_rate_display": "3.36%", "pdf_link": null}, {"state": "KY", "name": "Future Fund Endowment Inc", "assets_display": "$19,140,065", "spending_rate_display": "0.57%", "pdf_link": null}, {"state": "ME", "name": "Maine Coast Heritage Trust", "assets_display": "$298,161,205", "spending_rate_display": "6.95%", "pdf_link": null}, {"state": "ME", "name": "Somerset Woods Trustees", "assets_display": "$2,129,160", "spending_rate_display": "7.14%", "pdf_link": null}, {"state": "ME", "name": "Blue Hill Heritage Trust Inc", "assets_display": "$17,598,403", "spending_rate_display": "6.73%", "pdf_link": null}, {"state": "ME", "name": "Scarborough Land Conservation Trust", "assets_display": "$7,280,008", "spending_rate_display": "9.02%", "pdf_link": null}, {"state": "ME", "name": "Maine State Society For The Protection Of Animals", "assets_display": "$14,724,733", "spending_rate_display": "9.07%", "pdf_link": null}, {"state": "MD", "name": "Montgomery County Green Bank Corp", "assets_display": "$57,473,798", "spending_rate_display": "8.05%", "pdf_link": null}, {"state": "MA", "name": "Sconset Trust Inc", "assets_display": "$43,176,684", "spending_rate_display": "1.47%", "pdf_link": null}, {"state": "MA", "name": "Nantucket Conservation Foundation Inc", "assets_display": "$165,497,244", "spending_rate_display": "2.57%", "pdf_link": null}, {"state": "MI", "name": "Marshall Area Economic Development Alliance", "assets_display": "$203,118,967", "spending_rate_display": "1.56%", "pdf_link": null}, {"state": "MI", "name": "West Michigan Horticultural Society Inc", "assets_display": "$388,640,351", "spending_rate_display": "8.99%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F382394044_202309_990_2024042322370257.pdf"}, {"state": "MI", "name": "Frederik Meijer Gardens And Sculpture Foundation", "assets_display": "$177,615,031", "spending_rate_display": "4.12%", "pdf_link": null}, {"state": "MA", "name": "Essex County Greenbelt Association", "assets_display": "$66,568,689", "spending_rate_display": "3.93%", "pdf_link": null}, {"state": "MA", "name": "Orleans Conservation Trust", "assets_display": "$43,033,412", "spending_rate_display": "1.32%", "pdf_link": null}, {"state": "MI", "name": "Chippewa Nature Center Inc", "assets_display": "$39,484,445", "spending_rate_display": "7.69%", "pdf_link": null}, {"state": "MA", "name": "Berkshire Natural Resources", "assets_display": "$32,381,868", "spending_rate_display": "8.33%", "pdf_link": null}, {"state": "MI", "name": "Michigan Nature Association", "assets_display": "$22,079,522", "spending_rate_display": "5.32%", "pdf_link": null}, {"state": "MN", "name": "Minnesota Valley National Wildlife Refuge Trust Inc", "assets_display": "$40,303,615", "spending_rate_display": "5.80%", "pdf_link": null}, {"state": "MS", "name": "Wildlife Mississippi", "assets_display": "$75,991,350", "spending_rate_display": "7.05%", "pdf_link": null}, {"state": "MO", "name": "Johnny Morris Ozarks Heritage Preserve", "assets_display": "$360,406,762", "spending_rate_display": "3.48%", "pdf_link": null}, {"state": "MS", "name": "Mississippi River Tr", "assets_display": "$61,794,652", "spending_rate_display": "1.88%", "pdf_link": null}, {"state": "MO", "name": "The Saint Louis Zoo Foundation", "assets_display": "$250,509,248", "spending_rate_display": "5.61%", "pdf_link": null}, {"state": "MO", "name": "Surendra And Karen Gupta Arc Foundation", "assets_display": "$2,097,006", "spending_rate_display": "9.92%", "pdf_link": null}, {"state": "MO", "name": "Turtle Beach Wildlife Reserve", "assets_display": "$8,348,803", "spending_rate_display": "9.39%", "pdf_link": null}, {"state": "MO", "name": "National Garden Clubs Incorporated", "assets_display": "$23,343,583", "spending_rate_display": "8.30%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F430739519_202305_990_2024042322369523.pdf"}, {"state": "MT", "name": "American Prairie Foundation", "assets_display": "$171,484,657", "spending_rate_display": "6.74%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F810541893_202312_990_2024061122518632.pdf"}, {"state": "MO", "name": "Missouri Prairie Foundation", "assets_display": "$17,074,310", "spending_rate_display": "9.89%", "pdf_link": null}, {"state": "MO", "name": "Wdh Foundation C3 Tr", "assets_display": "$37,449,675", "spending_rate_display": "2.36%", "pdf_link": null}, {"state": "MT", "name": "Montana Land Reliance Foundation", "assets_display": "$39,072,004", "spending_rate_display": "0.42%", "pdf_link": null}, {"state": "NE", "name": "Omaha Zoo Foundation", "assets_display": "$176,399,926", "spending_rate_display": "6.16%", "pdf_link": null}, {"state": "NE", "name": "Doris Day Animal Foundation", "assets_display": "$9,898,440", "spending_rate_display": "8.51%", "pdf_link": null}, {"state": "NE", "name": "Omaha Botanical Center Inc", "assets_display": "$77,976,254", "spending_rate_display": "9.36%", "pdf_link": null}, {"state": "NE", "name": "Herbert T Weston Jr & Marian S Weston Foundation", "assets_display": "$10,802,240", "spending_rate_display": "7.52%", "pdf_link": null}, {"state": "NE", "name": "Platte River Whooping Crane Critical Habitat Maintenance Trust", "assets_display": "$15,222,376", "spending_rate_display": "5.01%", "pdf_link": null}, {"state": "NE", "name": "Nebraska Humane Society Foundation", "assets_display": "$30,287,292", "spending_rate_display": "5.08%", "pdf_link": null}, {"state": "NH", "name": "The Carl Siemon Family Charitable Trust", "assets_display": "$12,937,532", "spending_rate_display": "4.51%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F226670093_202312_990PF_2024062722618519.pdf"}, {"state": "NH", "name": "Nhspca Trust", "assets_display": "$5,451,537", "spending_rate_display": "2.09%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_11_2023_prefixes_75-81%2F756671809_202303_990_2023113022029088.pdf"}, {"state": "NH", "name": "Lakes Region Conservation Trust", "assets_display": "$35,130,842", "spending_rate_display": "0.65%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_02_2024_prefixes_01-13%2F020347918_202303_990_2024020822282851.pdf"}, {"state": "NH", "name": "Squam Lakes Conservation Society", "assets_display": "$18,799,640", "spending_rate_display": "3.08%", "pdf_link": null}, {"state": "NH", "name": "Sustainable Forest Futures Inc", "assets_display": "$13,753,423", "spending_rate_display": "6.15%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F251923175_202304_990_2024040522345013.pdf"}, {"state": "NH", "name": "Beaver Brook Association Inc", "assets_display": "$10,084,638", "spending_rate_display": "9.91%", "pdf_link": null}, {"state": "NH", "name": "Rolling Dog Farm", "assets_display": "$7,662,479", "spending_rate_display": "5.74%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F810537598_202312_990PF_2024060322471079.pdf"}, {"state": "NH", "name": "Society For The Protection Of New Hampshire Forests", "assets_display": "$107,340,365", "spending_rate_display": "7.75%", "pdf_link": null}, {"state": "NJ", "name": "South Jersey Land & Water Trust Inc", "assets_display": "$2,722,574", "spending_rate_display": "9.72%", "pdf_link": null}, {"state": "NM", "name": "Horse Shelter", "assets_display": "$22,331,975", "spending_rate_display": "4.10%", "pdf_link": null}, {"state": "NM", "name": "Illinois No 3 Foundation", "assets_display": "$13,825,846", "spending_rate_display": "6.49%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F814700522_202312_990PF_2024070222638964.pdf"}, {"state": "NY", "name": "Research Center On Natural Conservation Inc", "assets_display": "$22,691,072", "spending_rate_display": "2.76%", "pdf_link": null}, {"state": "NY", "name": "Chantecaille Family Foundation", "assets_display": "$152,745,289", "spending_rate_display": "4.56%", "pdf_link": null}, {"state": "ND", "name": "American Foundation For Wildlife", "assets_display": "$9,932,911", "spending_rate_display": "5.28%", "pdf_link": null}, {"state": "ND", "name": "North Dakota Wildlife Federation Inc", "assets_display": "$5,140,676", "spending_rate_display": "5.12%", "pdf_link": null}, {"state": "ND", "name": "Dakota Zoological Society Endowment Fund Inc", "assets_display": "$2,403,695", "spending_rate_display": "4.60%", "pdf_link": null}, {"state": "OH", "name": "Appalachia Ohio Alliance", "assets_display": "$46,785,201", "spending_rate_display": "1.21%", "pdf_link": null}, {"state": "OH", "name": "Joanie C Bernard Foundation", "assets_display": "$79,797,612", "spending_rate_display": "5.87%", "pdf_link": null}, {"state": "OH", "name": "Holden Arboretum", "assets_display": "$176,229,844", "spending_rate_display": "5.98%", "pdf_link": null}, {"state": "OH", "name": "Great Parks Forever", "assets_display": "$18,696,248", "spending_rate_display": "5.14%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F261559254_202312_990_2024071122681746.pdf"}, {"state": "OH", "name": "Gigis", "assets_display": "$48,158,413", "spending_rate_display": "6.00%", "pdf_link": null}, {"state": "OH", "name": "Toledo Zoological Society Foundation", "assets_display": "$36,376,856", "spending_rate_display": "7.77%", "pdf_link": null}, {"state": "OH", "name": "Cincinnati Nature Center Association", "assets_display": "$72,976,684", "spending_rate_display": "8.80%", "pdf_link": null}, {"state": "OH", "name": "Holden Arboretum Trust", "assets_display": "$67,972,915", "spending_rate_display": "7.93%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_02_2024_prefixes_31-38%2F346919291_202309_990_2024022022293272.pdf"}, {"state": "OH", "name": "Horticultural Research Institute Endowment Fund Inc", "assets_display": "$20,184,335", "spending_rate_display": "5.37%", "pdf_link": null}, {"state": "OK", "name": "Land Legacy", "assets_display": "$95,342,445", "spending_rate_display": "0.23%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F300137741_202312_990_2024061022504427.pdf"}, {"state": "OK", "name": "Ace Educational Foundation Inc", "assets_display": "$7,537,592", "spending_rate_display": "0.11%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F820610516_202312_990_2024061022504160.pdf"}, {"state": "PA", "name": "Natural Lands Trust Incorporated", "assets_display": "$305,979,083", "spending_rate_display": "6.47%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_05_2024_prefixes_23-26%2F236272818_202306_990_2024051722396845.pdf"}, {"state": "PA", "name": "Pennypack Ecological Restoration Tr", "assets_display": "$47,644,987", "spending_rate_display": "3.42%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_05_2024_prefixes_20-23%2F231732453_202306_990_2024050722386243.pdf"}, {"state": "PA", "name": "Natural Lands Trust U Decl", "assets_display": "$25,880,205", "spending_rate_display": "5.92%", "pdf_link": null}, {"state": "PA", "name": "Allegheny Land Tr", "assets_display": "$29,584,771", "spending_rate_display": "6.73%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_02_2024_prefixes_22-25%2F251718611_202306_990_2024022022291931.pdf"}, {"state": "PA", "name": "Runnymede Sanctuary Ua Of Diana S Wister 08052013 Tr", "assets_display": "$86,876,429", "spending_rate_display": "2.04%", "pdf_link": null}, {"state": "RI", "name": "Stand Up For Animals", "assets_display": "$3,914,892", "spending_rate_display": "7.76%", "pdf_link": null}, {"state": "PA", "name": "Montgomery County Society For The Prevention Of Cruelty To Animals", "assets_display": "$67,413,877", "spending_rate_display": "4.85%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F231425036_202312_990_2024070522667469.pdf"}, {"state": "PA", "name": "Willistown Conservation Trust Inc", "assets_display": "$40,481,597", "spending_rate_display": "6.47%", "pdf_link": null}, {"state": "SC", "name": "Tyger River Foundation", "assets_display": "$10,116,734", "spending_rate_display": "1.68%", "pdf_link": null}, {"state": "RI", "name": "Weekapaug Foundation For Conservation", "assets_display": "$20,085,482", "spending_rate_display": "0.73%", "pdf_link": null}, {"state": "SC", "name": "United States Endowment Forforestry And Communities Inc", "assets_display": "$300,985,916", "spending_rate_display": "9.02%", "pdf_link": null}, {"state": "SD", "name": "Hanson Family Foundation For The Well Being Of Gods Creatures", "assets_display": "$3,299,441", "spending_rate_display": "0.28%", "pdf_link": null}, {"state": "SD", "name": "Conata Conservation Trust", "assets_display": "$5,423,196", "spending_rate_display": "7.99%", "pdf_link": null}, {"state": "SD", "name": "Mccook Lake Izaak Walton League", "assets_display": "$2,864,845", "spending_rate_display": "5.75%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F460404242_202312_990_2024061122514026.pdf"}, {"state": "SC", "name": "Hallie Hill Animal Sanctuary", "assets_display": "$4,945,613", "spending_rate_display": "8.66%", "pdf_link": null}, {"state": "SC", "name": "Heritage Preservation Trust Inc", "assets_display": "$12,672,489", "spending_rate_display": "8.44%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_01_2024_prefixes_81-82%2F815237557_202212_990_2024010322166145.pdf"}, {"state": "TN", "name": "The Elephant Sanctuary In Tennessee", "assets_display": "$89,425,790", "spending_rate_display": "7.66%", "pdf_link": null}, {"state": "TN", "name": "Wetlands America Trust Inc", "assets_display": "$177,145,372", "spending_rate_display": "7.23%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F363330394_202306_990_2024061122523846.pdf"}, {"state": "TN", "name": "Appalachian Conservation Institute Llc", "assets_display": "$2,549,340", "spending_rate_display": "1.79%", "pdf_link": null}, {"state": "TX", "name": "Visa Vel Foundation", "assets_display": "$13,713,144", "spending_rate_display": "0.90%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_12_2023_prefixes_85-87%2F854325575_202212_990PF_2023121922136668.pdf"}, {"state": "TN", "name": "Southern Conservation Corp", "assets_display": "$24,690,825", "spending_rate_display": "2.04%", "pdf_link": null}, {"state": "TN", "name": "Tennessee River Gorge Trust Inc", "assets_display": "$24,718,580", "spending_rate_display": "5.64%", "pdf_link": null}, {"state": "TN", "name": "Franklin S Charge Inc", "assets_display": "$5,737,119", "spending_rate_display": "2.07%", "pdf_link": null}, {"state": "TX", "name": "Artist Boat Inc", "assets_display": "$18,434,960", "spending_rate_display": "6.95%", "pdf_link": null}, {"state": "TX", "name": "Moore Odom Wildlife Foundation Inc", "assets_display": "$75,131,329", "spending_rate_display": "4.29%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=IRS%2F721596131_202312_990PF_2024060322471556.pdf"}, {"state": "UT", "name": "Utah Open Lands Conservation Association Inc", "assets_display": "$10,974,396", "spending_rate_display": "7.16%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_02_2024_prefixes_84-93%2F870480542_202304_990_2024020822278878.pdf"}, {"state": "TX", "name": "American Quarter Horse Foundation", "assets_display": "$56,783,133", "spending_rate_display": "4.04%", "pdf_link": "https://projects.propublica.org/nonprofits/download-filing?path=download990pdf_05_2024_prefixes_47-52%2F510187823_202309_990_2024050722386638.pdf"}, {"state": "VT", "name": "Sandbhreagh Wildlands Sanctuary And Tr", "assets_display": "$4,213,179", "spending_rate_display": "1.45%", "pdf_link": null}, {"state": "VT", "name": "Pope Memorial Frontier Animal Shelter Inc", "assets_display": "$3,684,965", "spending_rate_display": "9.71%", "pdf_link": null}, {"state": "VA", "name": "Volgenau Foundation", "assets_display": "$154,624,111", "spending_rate_display": "9.19%", "pdf_link": null}, {"state": "VT", "name": "Farm And Wilderness Conservation Inc", "assets_display": "$7,479,510", "spending_rate_display": "5.82%", "pdf_link": null}, {"state": "VA", "name": "Blue Investments For Nature Inc", "assets_display": "$451,128,627", "spending_rate_display": "5.04%", "pdf_link": null}, {"state": "WV", "name": "Humane Society Of Harrison County Inc Of West Virginia", "assets_display": "$7,046,233", "spending_rate_display": "5.77%", "pdf_link": null}, {"state": "WV", "name": "Appalachian Headwaters Inc", "assets_display": "$35,451,999", "spending_rate_display": "6.99%", "pdf_link": null}, {"state": "WI", "name": "Kohler Tr For Clean Water", "assets_display": "$283,747,473", "spending_rate_display": "1.39%", "pdf_link": null}, {"state": "WI", "name": "Southern Wisconsin Bird Alliance Inc", "assets_display": "$16,336,310", "spending_rate_display": "6.80%", "pdf_link": null}, {"state": "WI", "name": "Ridges Sanctuary Inc", "assets_display": "$14,586,795", "spending_rate_display": "9.11%", "pdf_link": null}, {"state": "WV", "name": "Peterman Foundation Inc", "assets_display": "$4,548,257", "spending_rate_display": "6.55%", "pdf_link": null}];

// ------------------------------------------------------------------
// APP COMPONENT
// ------------------------------------------------------------------
export default function ZombieHunterApp() {
  const [view, setView] = useState<"landing" | "app">("landing");
  
  // CHANGED: Default tab is now "charts" (Leaderboards) instead of "search"
  const [activeTab, setActiveTab] = useState<"search" | "charts">("charts");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate Total Assets Found for the Landing Page
  const totalAssetsFound = useMemo(() => {
    let total = 0;
    ZOMBIE_DATA.forEach(d => {
      const num = parseInt(d.assets_display.replace(/[^0-9]/g, '')) || 0;
      total += num;
    });
    return (total / 1000000).toFixed(0); // In Millions
  }, []);

  // LANDING PAGE VIEW
  if (view === "landing") {
    return (
      <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center px-6 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-emerald-400 mb-8 mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online • {ZOMBIE_DATA.length} Targets Active
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Unlock the <br className="hidden md:block"/>
            <span className="text-white">Hoarded Wealth.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The world's first open-source intelligence tool for identifying dormant charitable foundations. We found 
            <span className="text-emerald-400 font-semibold mx-1">${totalAssetsFound} Million</span> 
            sitting in tax-free accounts, doing nothing.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setView("app")}
              className="group relative px-8 py-4 bg-white text-zinc-950 rounded-full font-bold text-lg hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.6)]"
            >
              Start Hunting
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="https://projects.propublica.org/nonprofits/" 
              target="_blank"
              className="px-8 py-4 rounded-full font-medium text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              View Source Data
            </a>
          </div>
        </motion.div>

        {/* Footer Credit */}
        <div className="absolute bottom-8 text-zinc-600 text-xs font-mono">
          BUILT BY AARUSH JAIN
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 flex flex-col md:flex-row overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-white/5 transform transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:static flex flex-col`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => setView("landing")}>
            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <TrendingDown className="text-emerald-400 w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Moneyball</h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">By Aarush Jain</p>
            </div>
          </div>

          <nav className="space-y-1">
             <NavButton 
              active={activeTab === "charts"} 
              onClick={() => { setActiveTab("charts"); setIsMobileMenuOpen(false); }}
              icon={<Trophy className="w-4 h-4" />}
              label="Leaderboards"
            />
            <NavButton 
              active={activeTab === "search"} 
              onClick={() => { setActiveTab("search"); setIsMobileMenuOpen(false); }}
              icon={<Search className="w-4 h-4" />}
              label="Hunter Search"
            />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-xs text-zinc-400 font-medium">Live Database</p>
            </div>
            <p className="text-2xl font-mono text-white font-bold tracking-tight">{ZOMBIE_DATA.length}</p>
            <p className="text-[10px] text-emerald-500/80">Active Targets Found</p>
          </div>
        </div>
      </aside>

      {/* MOBILE TOGGLE */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-zinc-900/90 backdrop-blur rounded-full border border-white/10 text-white shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-screen overflow-y-auto bg-black/20 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <AnimatePresence mode="wait">
          {activeTab === "search" ? (
            <SearchView key="search" data={ZOMBIE_DATA} />
          ) : (
            <LeaderboardView key="charts" data={ZOMBIE_DATA} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ------------------------------------------------------------------
// VIEW 1: SEARCH
// ------------------------------------------------------------------
function SearchView({ data }: { data: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  
  const uniqueStates = ["All", ...Array.from(new Set(data.map(item => item.state))).sort()];

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === "All" || item.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 md:p-12 max-w-7xl mx-auto relative z-10"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Target Hunter</h2>
        <p className="text-zinc-400">Filter the database by name or region.</p>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl py-4 mb-8 border-b border-white/5 -mx-6 px-6 md:-mx-12 md:px-12">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search foundation name..." 
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white placeholder:text-zinc-600 hover:bg-zinc-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <select 
              className="w-full appearance-none bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-zinc-300 cursor-pointer hover:bg-zinc-900 transition-colors"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-3 h-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
        {filteredData.slice(0, 100).map((item, index) => (
          <FoundationCard key={index} data={item} index={index} />
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full text-center py-20">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
              <AlertTriangle className="w-6 h-6 text-zinc-600" />
            </div>
            <p className="text-zinc-500">No results found.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// VIEW 2: LEADERBOARDS
// ------------------------------------------------------------------
function LeaderboardView({ data }: { data: any[] }) {
  const parseAsset = (str: string) => parseInt(str.replace(/[^0-9]/g, '')) || 0;
  const parseRate = (str: string) => parseFloat(str.replace('%', '')) || 0;

  const topHoarders = useMemo(() => {
    return [...data].sort((a, b) => parseAsset(b.assets_display) - parseAsset(a.assets_display)).slice(0, 5);
  }, [data]);

  const leastSpenders = useMemo(() => {
    return [...data].sort((a, b) => parseRate(a.spending_rate_display) - parseRate(b.spending_rate_display)).slice(0, 5);
  }, [data]);

  const primeTargets = useMemo(() => {
    return [...data].sort((a, b) => {
      const scoreA = parseAsset(a.assets_display) * (10 - parseRate(a.spending_rate_display));
      const scoreB = parseAsset(b.assets_display) * (10 - parseRate(b.spending_rate_display));
      return scoreB - scoreA;
    }).slice(0, 5);
  }, [data]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 relative z-10"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Global Intel</h2>
        <p className="text-zinc-400">Top outliers and high-value targets.</p>
      </div>

      <ChartSection 
        title="Prime Targets" 
        subtitle="Highest Assets + Lowest Spending (The 'Goldilocks' Zone)"
        icon={<Target className="text-emerald-400" />}
        data={primeTargets}
        colorClass="emerald"
        delay={0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartSection 
          title="The Vaults" 
          subtitle="Highest Total Assets Held"
          icon={<Briefcase className="text-amber-400" />}
          data={topHoarders}
          colorClass="amber"
          delay={0.1}
        />
        <ChartSection 
          title="The Scrooges" 
          subtitle="Lowest Spending Percentage"
          icon={<Percent className="text-red-400" />}
          data={leastSpenders}
          colorClass="red"
          delay={0.2}
        />
      </div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------
function ChartSection({ title, subtitle, icon, data, colorClass, delay }: any) {
  const colors: any = {
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    red: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg border ${colors[colorClass] ? colors[colorClass].split(" ")[2] + " " + colors[colorClass].split(" ")[1] : ""}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-xs text-zinc-500">{subtitle}</p>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
        {data.map((item: any, i: number) => (
          <div key={i} className="flex items-center p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-default">
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-mono font-bold text-xs mr-4 ${i < 3 ? colors[colorClass].split(" ")[0] + " bg-white/5" : "text-zinc-600 bg-zinc-950"}`}>
              {i + 1}
            </div>
            <div className="flex-1 min-w-0 mr-4">
              <h4 className="font-semibold text-zinc-200 text-sm truncate group-hover:text-white transition-colors">{item.name}</h4>
              <p className="text-[10px] text-zinc-500 flex items-center gap-2 mt-0.5">
                <span className="bg-zinc-800 px-1.5 py-px rounded text-[9px] uppercase tracking-wider">{item.state}</span>
                {item.assets_display} Assets
              </p>
            </div>
            <div className="text-right">
              <div className={`font-mono font-bold text-sm ${colorClass === 'red' ? 'text-red-400' : 'text-emerald-400'}`}>
                {item.spending_rate_display}
              </div>
              <a href={item.pdf_link} target="_blank" className="text-[10px] text-zinc-600 hover:text-white flex items-center justify-end gap-1 mt-0.5 transition-colors">
                View <ArrowRight className="w-2 h-2" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function NavButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        active 
          ? "bg-white/10 text-white shadow-inner" 
          : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function FoundationCard({ data, index }: { data: any, index: number }) {
  const assetsNum = parseInt(data.assets_display.replace(/[^0-9]/g, ''));
  const rateNum = parseFloat(data.spending_rate_display.replace('%', ''));
  const severity = Math.min(100, Math.max(0, (10 - rateNum) * 10));
  const hasLink = data.pdf_link && data.pdf_link !== "N/A" && data.pdf_link !== "None";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-zinc-900/40 border border-white/5 rounded-2xl p-5 hover:bg-zinc-900 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-2">
          <h3 className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-1 text-sm">
            {data.name}
          </h3>
          <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {data.state}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-black/20 border border-white/5">
          <p className="text-[10px] text-zinc-500 mb-1">Total Assets</p>
          <p className="text-sm font-mono font-semibold text-white truncate">{data.assets_display}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-black/20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <div className={`w-1.5 h-1.5 rounded-full ${rateNum < 5 ? 'bg-red-500 animate-pulse shadow-[0_0_8px_red]' : 'bg-amber-400'}`}></div>
          </div>
          <p className="text-[10px] text-zinc-500 mb-1">Spend Rate</p>
          <p className={`text-sm font-mono font-semibold ${rateNum < 5 ? 'text-red-400' : 'text-amber-300'}`}>
            {data.spending_rate_display}
          </p>
        </div>
      </div>

      {hasLink ? (
        <a 
          href={data.pdf_link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 text-zinc-300 text-xs font-semibold hover:bg-emerald-500 hover:text-white transition-all border border-white/5 hover:border-emerald-400/50 group-hover:shadow-lg"
        >
          <ExternalLink className="w-3 h-3" /> Analyze 990-PF
        </a>
      ) : (
        <button disabled className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-black/20 text-zinc-600 text-xs font-semibold border border-white/5 cursor-not-allowed">
          <Ban className="w-3 h-3" /> Data Unavailable
        </button>
      )}
    </motion.div>
  );
}

<SpeedInsights/>
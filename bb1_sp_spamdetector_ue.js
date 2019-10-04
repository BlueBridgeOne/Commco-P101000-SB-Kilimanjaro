/**
 * Project : MR
 * 
 * Description : Make spammy leads inactive. Pattern match against the comments.
 * 
 * @Author : Gordon Truslove
 * @Date   : 4/24/2019, 1:59:38 PM
 * 
 * Copyright (c) 2017 BlueBridge One Business Solutions, All Rights Reserved
 * support@bluebridgeone.com, +44 (0)1932 300007
 * 
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search'],

    function (record, search) {


        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function beforeSubmit(scriptContext) {

            if (scriptContext.type == scriptContext.UserEventType.DELETE) return;

            var currentRecord = scriptContext.newRecord;
            var comments = currentRecord.getValue({
                fieldId: 'custentity_comments'
            }).toLowerCase();
            var isinactive = currentRecord.getValue({
                fieldId: 'isinactive'
            });
            if (!isinactive) {
                var spam = [];
                spam.push("href=http");
                spam.push(".ru - ");
                spam.push("want to buy with discount?");
                spam.push("downloads music");
                spam.push("college research paper");
                spam.push("pharmacy");
                spam.push("[url=http");
                spam.push("новгород");
                spam.push("arthritis");
                spam.push("yahoo answers");
                spam.push("л");
                spam.push("д");
                spam.push("invest $");
                spam.push("passive income");
                spam.push("solid backlinks");
                spam.push("best cryptocurrency");
                spam.push("top cryptocurrencies");
                spam.push("site creation and development ");
                spam.push("#background");
                spam.push("payments of up to 30%");
                spam.push("000 in bitcoin");
                spam.push("bitcoin mining");
                spam.push("sexy girls");
                spam.push("siri/google/alexa");
                spam.push("facebook ads");
                spam.push("https://bit.ly/");
                spam.push("http://bit.ly");
                spam.push("girls for sex");
                spam.push("women for sex");
                spam.push("google just updated their algorithm");
                spam.push("https://lil.ink");
                spam.push("https://tinyurl.com");
                spam.push("girl for the night");
                spam.push("una chica");
                spam.push("filles sexy");
                spam.push("sie sexy");
                spam.push("improve your seo");
                spam.push("extra money from home");
                spam.push("importantoffers");
                spam.push("visitors to your website");
                spam.push("sex in deiner");
                spam.push("000 a month");
                spam.push("juicy woman");
                spam.push("make $");
                spam.push("website traffic");
                spam.push("sex in your town");
                spam.push("viewtopic.php");
                spam.push("weight loss plan");
                spam.push("bon sexe");
                spam.push("parrot-disco");
                spam.push("sexe dans");
                spam.push("saftige frau");
                spam.push("create a site for us");
                spam.push("suchen sie sich");
                spam.push("guten sex");
                spam.push("1000awesomethings");
                spam.push("0 mins: http:");
                spam.push("0 per hour: http:");
                spam.push("sex in your town");
                spam.push("sex in your city");
                spam.push("topratinglist");
                spam.push("cryptocurrency with income");
                spam.push("start a business at home");
                spam.push("online casino");
                spam.push("online slots");
                spam.push("i have $");
                spam.push(".000 macht");
                spam.push("engrossinggenius");
                spam.push("custom-made online promotional video");
                spam.push("inclined sentiment");
                spam.push("juicy women");
                spam.push("comment gagner");
                spam.push(".000 в");
                spam.push("india based software");
                spam.push("giftedgift");
                spam.push("crave sex");
                spam.push("hot girls");
                spam.push("000 per week: http");
                spam.push("000 pro woche: http");
                spam.push("high-minded click");
                spam.push("handle more traffic");
                spam.push("hello. and bye.");
                spam.push("a grumpy boss");
                spam.push("crypto clothing");
                spam.push("businesses who are currently ranked");
                spam.push("hot step sister:");
                spam.push("every survey you completed");
                spam.push("casual sex");
                spam.push("experiencing a large demand for businesses");
                spam.push("dating sites");
                spam.push("more traffic to your website");
                spam.push("rank any site");
                spam.push("only today @");
                spam.push("only today at https:");
                spam.push("https://my.su");
                spam.push("advertisement is placed");
                spam.push("magical purse");
                spam.push("trаding litесоin");
                spam.push("high-quаlity vidео сliрs");
                spam.push("offer high quality mailing service");
                spam.push("fоllowing оn Instagram");
                spam.push("how to make money");
                spam.push("you won the iphone ");
                spam.push("000 in 5 minutes: http:");
                spam.push("essay writing service:");
                spam.push("choice of women");
                spam.push("ћ");
                spam.push("µ");
                spam.push("secret of eternal youth");
                spam.push("private ftp");
                spam.push("sexual relationship");
                spam.push("first page of google");
                spam.push("porno");
                spam.push("round-the-wоrld triр");
                spam.push("in this video");
                spam.push("get up to $");
                spam.push("affiliаtes аrе mаking $");
                spam.push("sunglasses");
                spam.push("research on site speeds");
                spam.push("top of the search rankings");
                spam.push("1st page of google");
                spam.push("drug price");
                spam.push("increase your clients and customers");
                spam.push("mакe you $");
                spam.push("quality traffic");
                spam.push("prоmotion: http:");
                spam.push("first page of the search");
                spam.push("makemoney");
                spam.push("information on investments");
                spam.push("dollar millionaire");
                spam.push("web design service");
                spam.push("make a lot of money");
                spam.push("mаking $");
                spam.push("00 рer dаy");
                spam.push("freelance copywriter?");
                spam.push("de votre coeur");
                spam.push("д");
                spam.push("training provider");
                spam.push("traffic to your website");
                spam.push("when I came across your site");
                spam.push("fоllowing оn instagram");
                spam.push("travel benefits program");
                spam.push("getting external help");
                spam.push("internet business analyst");
                spam.push("ruin your website");
                spam.push("research paper");
                spam.push("viagra");
                spam.push("cefaclor");
                spam.push("vitria");
                spam.push("1st page of google");
                spam.push("seorussian.ru");
                spam.push("optimize your facebook page");
                spam.push("howtoinvest");
                spam.push("bestinvest");
                spam.push( "google 1st page");
                spam.push("roulette");
                spam.push("click on the link below to qualify");
                spam.push("sexywoman");
                spam.push("get your ticket for");
                spam.push("ttps://clck.ru");
                spam.push("money from home");
                


                for (var i = 0; i < spam.length; i++) {
                    if (comments.indexOf(spam[i]) > -1) {
                        currentRecord.setValue({
                            fieldId: 'isinactive',
                            value: true,
                            ignoreFieldChange: true
                        });
                        log.debug("SPAM", "Detected spam phrase '" + spam[i] + "' in record #" + currentRecord.id + ".");

                        if (scriptContext.type == scriptContext.UserEventType.CREATE){
                            log.debug("SPAM", "Throw error.");
                            throw(new Error("Unable to save, this record looks like spam."));
                        }
                        break;
                    }
                }
            }

        }

        return {
            beforeSubmit: beforeSubmit
        };

    });
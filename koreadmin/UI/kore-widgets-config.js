(function(KoreSDK){

    var KoreSDK=KoreSDK||{};

    var botOptionsWiz = {};
    botOptionsWiz.logLevel = 'debug';
    botOptionsWiz.koreAPIUrl = "https://bots.kore.ai";

    botOptionsWiz.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    botOptionsWiz.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
    botOptionsWiz.botInfo = { name: "cakebuddyadmin", "_id": "st-1b3ff917-332a-5b52-bc74-08ca105b1cdd" }; // bot name is case sensitive
    botOptionsWiz.clientId = "cs-47cfa4e7-76f1-567c-8a50-b54ce0065b98";
    botOptionsWiz.clientSecret = "zKzvUx4ZojNo4wExWaspxr8lViDvhqCk4+G2yE46DbU=";

    var widgetsConfig = {
        botOptions: botOptionsWiz
    };
    
    KoreSDK.widgetsConfig=widgetsConfig
})(window.KoreSDK);
$(function(){
    // update regexes to match your requirements
    var regexBad = /^.{1,40}$/; //
    var regexGood = new RegExp("^(?=.{5,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$");
    var regexBest = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$");

    function viewModel(){

        var self = this;
        
        // binds to password input field
        self.pass = ko.observable();
        
        // binds to display element
        self.output = ko.observable();
        
        // knockout computed function that runs every time self.pass() gets updated (input field in this example)
        self.resetScreen = ko.computed(function() {
            var msg = "";
            var badPass;
            var goodPass;
            var bestPass;

            bestPass = regexBest.test(self.pass());
            
            // displays this message if regexBest is reached
            if(bestPass) {
                msg = "You're the password King!";
            }
            else {
                goodPass = regexGood.test(self.pass());
                
                // displays this message if regexGood is reached
                if(goodPass && !msg) {
                    msg = "That's a pretty nice password";
                }
                else {
                    badPass = regexBad.test(self.pass());
                    
                    // displays this message if regexBad is reached
                    if(badPass && !msg) {
                        msg = "That password is weak sauce";
                    }
                }
            }
            
            // runs the toastr notification with message
            if(msg) {
                toastr.info(msg);
            }
            
            // binds message to HTML element (an h2 in this example)
            self.output(msg);

        });
    }

    ko.applyBindings(new viewModel());
});

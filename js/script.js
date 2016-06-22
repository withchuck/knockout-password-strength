$(function(){
    var regexBad = /^.{1,40}$/; //
    var regexGood = new RegExp("^(?=.{5,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$");
    var regexBest = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$");

    function viewModel(){

        var self = this;

        self.pass = ko.observable();
        self.output = ko.observable();

        self.resetScreen = ko.computed(function() {
            var msg = "";
            var badPass;
            var goodPass;
            var bestPass;

            bestPass = regexBest.test(self.pass());

            if(bestPass) {
                msg = "You're the password King!";
            }
            else {
                goodPass = regexGood.test(self.pass());

                if(goodPass && !msg) {
                    msg = "That's a pretty nice password";
                }
                else {
                    badPass = regexBad.test(self.pass());

                    if(badPass && !msg) {
                        msg = "That password is weak sauce";
                    }
                }
            }

            if(msg) {
                toastr.info(msg);
            }

            self.output(msg);

        });
    }

    ko.applyBindings(new viewModel());
});
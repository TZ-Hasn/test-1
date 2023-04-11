const tempMail = require('@cemalgnlts/mailjs');
const mailjs = new tempMail();
const deb = false;

module.exports.homeGet = async (req, res) => {
    console.log('--------------------HOME::GET--------------------------');
    // If the user doesn't has any mail then genrate
    try {
        if (req.session.user.mail == undefined)// is the user has an mail id
        {
            // Generating new mail for user as he/she has not any mail id
            let mail = await mailjs.createOneAccount();
            if (
                mail.status == true
                ||
                (mail.status > 199 && mail.status < 400)
            ) {
                // if mail successfully created
                req.session.user = {// updating session
                    mail: mail.data.username,
                    password: mail.data.password
                }
            } else {
                // if error then time out status + false response
                res.status(408).redirect('/');
                return;
            }
        }
    } catch (error) {
        if (deb) console.log(error);
        // Generating new mail for user as he/she has not any mail id
        let mail = await mailjs.createOneAccount();
        if (
            mail.status == true
            ||
            (mail.status > 199 && mail.status < 400)
        ) {
            // if mail successfully created
            req.session.user = {// updating session
                mail: mail.data.username,
                password: mail.data.password
            }
        } else {
            // if error then time out status + false response
            res.status(408).redirect('/');
            return;
        }
    }

    console.log("Current User: ", req.session.user)

    // Receiving E-Mails

    // Trying to login the user
    try {
        let loginStatus = await mailjs.login(req.session.user.mail, req.session.user.password);
        // console.log(loginStatus);
        if (loginStatus.status == false || loginStatus.status > 399) {
            res.status(408).redirect('/');
            return;
        }
    } catch (error) {
        if (deb) console.log(error);
        res.redirect('/');
        return;
    }

    // Getting Messages
    let email = await mailjs.getMessages();
    console.log("Messages: ", email, "Ending...\n\n");

    if (email.status == false || email.status > 399) {
        res.status(email.status).redirect('/');
        return;
    }

    // Adding Mails in object
    try {
        let response = ' ';
        for (i = 0; i < email.data.length; i++) {
            console.log("From: ", email.data[i].from);
            console.log("Body: ", email.data[i].intro, "------------------------------\n\n");

            response += `<div class="mail">
                            <h3><span>From:</span> ${email.data[i].from.address}</h3>
                            <p>${email.data[i].intro}</p>
                        </div>`;
        }
        if (deb) console.log(response);
        res.status(202).render("home.pug", { userMail: req.session.user.mail, userMsgs: response });
        return;
    } catch (error) {
        if (deb) console.log("Error: ", error);
        res.status(408).redirect('/');
        return;
    }
}

module.exports.changeMailGet = async (req, res) => {
    console.log('--------------------/mail/change::GET--------------------------');
    // Generating new mail for user if any doesn't exist
    let mail = await mailjs.createOneAccount();
    if (
        mail.status == true
        ||
        (mail.status > 199 && mail.status < 400)
    ) {
        // if mail successfully created
        req.session.user = {// updating session
            mail: mail.data.username,
            password: mail.data.password
        }
        console.log("User Session: ", req.session.user)
        res.status(202).redirect('/');
    } else {
        // if error then time out status + false response
        res.status(408).redirect('/');
    }
}

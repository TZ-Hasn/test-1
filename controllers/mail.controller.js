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

    console.log("Current User Session: ", req.session.user)
    // After Account Created
    // Serving to Home Page
    res.render('home', { userMail: req.session.user.mail });
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

module.exports.getMessages = async (req, res) => {
    console.log('--------------------/mail/receive::GET--------------------------');

    // Debug
    req.session.user = {
        mail: '4oln1@bugfoo.com',
        password: 'nuztn12s'
    }

    // If the user doesn't has any mail then send error
    try {
        if (req.session.user.mail == undefined) {
            res.json({ status: false });
            return;
        }
    } catch (error) {
        res.json({ status: false });
        return;
    }

    // If the user has an account then Receiving All E-Mails Shortly

    // Trying to login the user
    try {
        let loginStatus = await mailjs.login(req.session.user.mail, req.session.user.password);
        if (loginStatus.status == false || loginStatus.status > 399) {
            res.json({ status: false });//timeout
            return;
        }
    } catch (error) {
        if (deb) console.log(error);
        res.json({ status: false });//timeout
        return;
    }

    // Getting Messages
    let email = await mailjs.getMessages();
    console.log("Messages: ", email, "Ending...\n\n");

    if (email.status == false || email.status > 399) {
        res.status(email.status);
        return;
    }

    // Adding Mails in object
    try {
        res.status(202).json({
            status: true,
            data: email.data
        });
        return;
    } catch (error) {
        if (deb) console.log("Error: ", error);
        res.json({ status: false });
        return;
    }
}

module.exports.getMessageById = async (req, res) => {
    console.log('--------------------/mail/receive/:id  ::GET--------------------------');

    // If the user doesn't has any mail then send error
    try {
        if (req.session.user.mail == undefined) {
            res.redirect('/');
            return;
        }
    } catch (error) {
        res.redirect('/');
        return;
    }

    // const itemId = '644910ad660af89338de83d2';
    // await mailjs.login('ojz94@bugfoo.com', 't76ljib6');

    // If the user has an account then Receiving All E-Mails Shortly


    // Trying to login the user
    try {
        let loginStatus = await mailjs.login(req.session.user.mail, req.session.user.password);
        if (loginStatus.status == false || loginStatus.status > 399) {
            res.redirect('/');
            return;
        }
    } catch (error) {
        if (deb) console.log(error);
        res.redirect('/');
        return;
    }

    // After Succesfull Login
    let response = await mailjs.getMessage(req.params.id);
    if (
        response.status == true
        ||
        (res.status > 199 && response.status < 400)
    ) {
        res.send(response.data.html[0]);
    } else {
        res.redirect('/');
    }
    console.log(response);
}

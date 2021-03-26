"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("./../config/keys");
const sgMail = require("@sendgrid/mail");
class SendGridService {
    sendEmail(object) {
        sgMail.setApiKey(keys_1.sendGridApiKey);
        try {
            let msg = {
                to: object.to,
                from: object.email,
                subject: object.subject,
                text: object.text,
                html: object.html,
            };
            sgMail.send(msg);
        }
        catch (err) {
            console.log("Error al momento de enviar correo electronico: ", err);
        }
    }
}
exports.SendGridService = SendGridService;
//# sourceMappingURL=sendGridService.js.map
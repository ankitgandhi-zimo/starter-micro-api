import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  process.env.SEND_GRID_API_KEY
    ? process.env.SEND_GRID_API_KEY
    : " "
);

class sendMessage {
  public sendMail1 = (obj: any) => {
    const msg = {
      to: obj.to,
      from: "ankit.zimo@outlook.com", // obj.from,
      subject: obj.subject,
      text: obj.content,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  public sendMailMessage = (obj: any) => {
    return new Promise(function (resolve, reject) {
      const msg = {
        to: obj.to,
        from: "ankit.zimo@outlook.com", // obj.from,
        subject: obj.subject,
        text: obj.content,
        html: obj.html,
      };
      sgMail
        .send(msg)
        .then((data) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    })
      .then(function (result) {
        return true;
      })
      .catch((error: any) => {
        return false;
      });
  };
}
export default new sendMessage();

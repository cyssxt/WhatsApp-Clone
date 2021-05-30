import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Card,
  Typography,
  Checkbox,
  Button,
} from "@material-ui/core";
import {
  GREEN,
  GRAY,
  APP_BG_COLOR,
  MENU_GRAY,
  WHITE,
} from "../../utils/webColors";
import QRCode from "qrcode.react";
import { TEXT_TITLE } from "../../utils/webColors";
import Icon from "@material-ui/icons/WhatsApp";
import {getSocket} from "../../api/socketApi";
import {webConstants} from "../../utils/webConstants";
import EventConstant from "../../constants/EventConstant";
import {useHistory} from "react-router-dom";

const ScanCodeView = ({ params }) => {
  const classes = useStyles();
  const [qrCode, setQrCode] = useState("");
  const history = useHistory();
  useEffect(() => {
    let socket = getSocket();
    socket.on(webConstants.QR_CODE,(data)=>{
      console.log(data)
      setQrCode(data);
    })
    socket.on(EventConstant.LOGIN_SUCCESS,()=>{
      history.push("/chat");
    })

    socket.emit(webConstants.GET_QRCODE);

    return () => {
    };
  }, []);

  return (
    <html>
      <title>WhatsApp Clone Web</title>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <body className={classes.body}>
        <div className={classes.body}>
          <div
            style={{
              backgroundColor: GREEN,
              height: 200,
              paddingLeft: "10%",
            }}
          >
            <Button
              startIcon={<Icon style={{ fontSize: 40 }} />}
              style={{ marginTop: "2%", color: WHITE }}
              // onClick={() => {
              //   window.location.hash = "/chat";
              // }}
            >
              <Typography
                variant={"button"}
                component={"tbody"}
                style={{ fontSize: 18 }}
              >
                WhatsApp Clone Web
              </Typography>
            </Button>
          </div>
          <Card className={classes.cardStyle}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  marginRight: "5%",
                }}
              >
                <div className={classes.textStyle}>
                  <Typography
                    variant={"h4"}
                    component={"h4"}
                    style={{ marginBottom: "5%" }}
                  >
                    To use WhatsApp Clone on your computer :
                  </Typography>
                  <Typography
                    variant={"h5"}
                    component={"body"}
                    className={classes.textPointsStyle}
                  >
                    1. Open WhatsApp Clone on your phone
                  </Typography>
                  <Typography
                    variant={"h5"}
                    component={"body"}
                    className={classes.textPointsStyle}
                  >
                    2. Tap Menu and select Whatsapp Web
                  </Typography>
                  <Typography
                    variant={"h5"}
                    component={"body"}
                    className={classes.textPointsStyle}
                  >
                    3. Point your phone to this screen to capture the code
                  </Typography>
                </div>
                <div className={classes.codeDivStyle}>
                  {qrCode ?<QRCode
                      size={300}
                      value={qrCode}
                  />:<></>
                  }
                  <div>
                    <Button type="primary" onClick={()=>{
                      localStorage.removeItem("userId")
                      window.location.reload();
                    }}>清楚缓存</Button></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className={classes.textStyle}
                  >
                    <Checkbox color={GREEN} checked={true} />
                    <Typography
                      variant={"h7"}
                      component={"body"}
                      style={{
                        display: "flex",
                        alignSelf: "center",
                      }}
                    >
                      Keep me signed in.
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
};

const useStyles = makeStyles({
  cardStyle: {
    marginRight: "10%",
    marginLeft: "10%",
    marginTop: "-5%",
    width: "80%",
  },
  textStyle: {
    color: MENU_GRAY,
    fontFamily: "Roboto",
    fontVariant: "700",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%",
    width: "70%",
  },
  textPointsStyle: {
    color: TEXT_TITLE,
    fontFamily: "Roboto",
    fontVariant: "700",
    marginTop: "2%",
  },
  codeDivStyle: {
    color: GRAY,
    fontFamily: "Roboto",
    fontVariant: "700",
    marginTop: "5%",
    marginBottom: "5%",
    width: "30%",
  },
  codeStyle: {
    marginRight: "5%",
    marginTop: "5%",
  },
  body: {
    backgroundColor: APP_BG_COLOR,
    height: window.innerHeight,
    margin: -8,
    padding: 0,
  },
  checkStyle: {
    marginLeft: 90,
    marginTop: "5%",
  },
});

export default ScanCodeView;

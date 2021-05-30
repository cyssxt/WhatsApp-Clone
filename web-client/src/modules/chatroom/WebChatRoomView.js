import React, {useState, useRef, useEffect} from "react";

import ChatRoomLeftItem from "./WebChatRoomLeftItem";
import ChatRoomRightItem from "./WebChatRoomRightItem";
import ChatTextInput from "./WebChatTextInput";
import {
    getRecentMsg,
} from "../../api/webApiController";
import {List, CellMeasurer, CellMeasurerCache} from "react-virtualized";
import WhatsapBG from "../../assets/images/WhatsappBG.png";
import {getSocket} from "../../api/socketApi";
import SimpleDialog from "../../components/SimpleDialog";

const ChatRoomView = ({chatItem}) => {
    const [messages, setMessages] = useState([]);
    const [height, setHeight] = useState(80);
    const flatList = useRef();
    const inputRef = useRef();
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);
    const handleOpen = () => {
        setOpen(true)

    }
    const handleClose = (index,text) => {
        let socket = getSocket();
        socket.emit("SEND_VOICE", {
            url: `https://vlovef.oss-cn-hangzhou.aliyuncs.com/whatsapp/${index + 1}.opus`, jid: chatItem.jid
        })
        setMessages([...messages,{content:`发送语音:${text}`,fromMe:true}])
        setOpen(false);
        modifyRowHeight()
    }
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 80,
    });

    listenSocket()
    // This side effect is for refreshing socket data
    useEffect(() => {
        renderChats();
    }, [chatItem]);

    function listenSocket() {
        let socket = getSocket();
        socket.on("NEW-MSG", (message) => {
            if (!message.fromMe) {
                setMessages([...messages, message])
                modifyRowHeight();
            }
        });
    }

    function renderChats() {
        let {jid} = chatItem;
        getRecentMsg(jid).then((res) => {
            setMessages(res.data.data)
            modifyRowHeight(null, res.data.data);
        });
    }

    const onSendMessage = (text) => {
        if (text != "") {
            let {jid} = chatItem;
            let socket = getSocket()
            let data = [...messages, {content: text, fromMe: true}];
            setMessages(data)
            modifyRowHeight(null)
            socket.emit("SEND_TEXT", {jid, text});
        }
    };

    function modifyRowHeight(event, data) {
        if (event && event.target && event.target.value != "") {
            setHeight(inputRef.current.clientHeight);
            if (messages.length > 0) {
                setTimeout(() => {
                    flatList.current.measureAllRows();
                }, 1500);
                flatList.current.scrollToRow(messages.length);
            }
        } else {
            setTimeout(() => {
                let items = data || messages
                if (items.length > 0) {
                    setHeight(inputRef.current.clientHeight);
                    flatList.current.measureAllRows();
                    flatList.current.scrollToRow(items.length);
                }
            }, 200);
        }
    }

    const rowRenderer = ({index, parent, key, style, isScrolling}) => {
        var item = messages[index];
        let {fromMe} = item;
        return (
            <CellMeasurer
                key={key}
                cache={cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                {fromMe ? <ChatRoomRightItem item={item} styleList={style}/> :
                    <ChatRoomLeftItem item={item} styleList={style}/>}
            </CellMeasurer>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                background: "url(" + WhatsapBG + ")",
                height: "92%",
            }}
        >
            <div
                style={{
                    backgroundColor: "#E4DDD6",
                    height: "100%",
                    zIndex: "100",
                    opacity: "0.95",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    zIndex: "1000",
                    height: "92%",
                    width: "70%",
                }}
            >
                <List
                    ref={flatList}
                    style={{
                        height: "100%",
                        width: "100%",
                        outline: "none",
                        flex: 1,
                        paddingBottom: height === "" ? 80 : height,
                        paddingTop: 10,
                    }}
                    rowCount={messages.length}
                    height={window.innerHeight - 120}
                    width={window.innerWidth - window.innerWidth / 3.2}
                    rowHeight={cache.rowHeight}
                    deferredMeasurementCache={cache}
                    rowRenderer={rowRenderer}
                    scrollToAlignment={"end"}
                />
            </div>

            <div
                ref={inputRef}
                style={{
                    position: "fixed",
                    zIndex: "2000",
                    width: "70%",
                    marginBottom: 0,
                    resize: "vertical",
                    bottom: 0,
                    maxHeight: 160,
                    minHeight: 60,
                    overflow: "hidden",
                }}
            >
                <ChatTextInput
                    onSendMessage={(text) => onSendMessage(text)}
                    onTyping={(event) => {
                        modifyRowHeight(event);
                    }}
                    handleOpen={handleOpen}
                />
                <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose}/>
            </div>
        </div>
    );

};

export default ChatRoomView;

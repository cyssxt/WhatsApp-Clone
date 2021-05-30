import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

const chooses = ["1.  嗯哼，你是哪里人？",
    "2.  恩，你叫什么名字？",
    "3.  这是我，你觉得好看吗",
    "4.  你以前有过多少次恋爱经验?",
    "5.  你在休息期间干什么（说的不太清楚可能听不懂）",
    "6.  哈哈，谢谢你",
    "7.  哈哈，你的腹肌只有一块吗？",
    "8.  我告诉你一件事",
    "9.  真的吗？你想来见我吗？",
    "10.  你在做什么？",
    "11.  我很期待",
    "12.  嘻嘻，我要吃点东西，饿了，你呢，吃饭了吗",
    "13.  哈哈，亲爱的，你在做什么？",
    "14.  你真棒，我没打扰到你吧（说的不太清楚可能听不懂）",
    "15.  你在忙的时候会想起我吗？",
    "16.  嘻嘻，我希望快点见到你",
    "17.  我漂亮吗",
    "18.  我爱你",
    "19.  亲爱的，我很无助"]
function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value,text) => {
        onClose(value,text);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">选择要发送的语音</DialogTitle>
            <List>
                {chooses.map((e,index) => (
                    <ListItem button onClick={() => handleListItemClick(index,e)} key={index}>
                        <ListItemText primary={e} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
export default SimpleDialog;

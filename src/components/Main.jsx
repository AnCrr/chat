import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/core";

import { isFetching } from "../redux/helpers";

import { getMessages, getMessagesCount } from "../redux/messages/actions";
import {
  getMessagesData,
  getMessagesStatus,
  getMessagesCountData,
} from "../redux/messages/selectors";

import Messages from "./Messages";
import MessagesBottomBar from "./MessagesBottomBar";

import { getUserId } from "../redux/auth/selectors";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
  },
}));

const mapStateToProps = (state) => ({
  messages: getMessagesData(state),
  userId: getUserId(state),
  status: getMessagesStatus(state),
  count: getMessagesCountData(state),
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: bindActionCreators(getMessages, dispatch),
  getMessagesCount: bindActionCreators(getMessagesCount, dispatch),
});

const initialParams = {
  limit: 20,
  skip: 0,
};

const Main = ({
  messages,
  userId,
  getMessages,
  getMessagesCount,
  status,
  count,
}) => {
  const { chatId } = useParams();
  const classes = useStyles({});
  const queryParams = useRef(initialParams);

  useEffect(() => {
    if (chatId) {
      queryParams.current = initialParams;

      getMessages({ chatId, queryParams: queryParams.current });
      getMessagesCount({ chatId });
    }
  }, [getMessages, getMessagesCount, chatId]);

  if (!chatId) {
    return <div>Choose the chat</div>;
  }

  const handleMessageScroll = ({ target }) => {
    if (isFetching(status) || getFetchedCount() >= count) {
      return;
    }

    if (target.scrollTop - 50 <= 0) {
      queryParams.current = {
        limit: 20,
        skip: getFetchedCount(),
      };

      getMessages({ chatId, queryParams: queryParams.current });
    }
  };

  const getFetchedCount = () =>
    queryParams.current.skip + queryParams.current.limit;

  return (
    <div className={classes.root}>
      <Messages
        chatId={chatId}
        messages={messages}
        userId={userId}
        status={status}
        onMessageScroll={handleMessageScroll}
      />
      <MessagesBottomBar chatId={chatId} className="bottom" />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

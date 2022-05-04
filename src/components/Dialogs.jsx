import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory, useParams } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { makeStyles } from "@material-ui/core";

import { getDialogs, getDialogsCount } from "../redux/dialogs/actions";
import { getUserId } from "../redux/auth/selectors";
import { PROMISE_STATUSES } from "../redux/constants";

import {
  getDialogsData,
  getDialogsTotalCount,
  getDialogsStatus,
} from "../redux/dialogs/selectors";

import Dialog from "./Dialog";

const useStyles = makeStyles(() => ({
  root: {
    height: "85%",
  },
}));

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  dialogs: getDialogsData(state),
  count: getDialogsTotalCount(state),
  status: getDialogsStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  getDialogs: bindActionCreators(getDialogs, dispatch),
  getDialogsCount: bindActionCreators(getDialogsCount, dispatch),
});

const Dialogs = ({
  dialogs,
  status,
  count,
  userId,
  getDialogs,
  getDialogsCount,
}) => {
  const history = useHistory();
  const { chatId } = useParams();
  const classes = useStyles({});

  useEffect(() => {
    if (userId) {
      getDialogsCount({ userId });
    }
  }, [getDialogs, getDialogsCount, userId]);

  const handleDialog = (id) => {
    if (chatId !== id) {
      history.push(`/${id}`);
    }
  };

  const isItemLoaded = (index) => {
    return index < dialogs.length && dialogs[index] !== null;
  };

  const loadMoreItems = (startIndex, stopIndex) => {
    if (status === PROMISE_STATUSES.PENDING) {
      return;
    }

    return getDialogs({
      userId,
      queryParams: {
        limit: [stopIndex - startIndex],
        skip: [startIndex],
      },
    });
  };

  const renderElements = ({ index, data, style }) => {
    const dialog = data[index];

    if (!dialog) {
      return null;
    }

    const element = (
      <Dialog
        style={style}
        dialog={dialog}
        chatId={chatId}
        onSelectDialog={handleDialog}
      />
    );

    return element;
  };

  return (
    <div className={classes.root}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={count}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                className="List"
                height={height}
                width={width}
                itemCount={count}
                itemSize={50}
                itemData={dialogs.sort(
                  (a, b) => b.lastModified - a.lastModified
                )}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {renderElements}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);

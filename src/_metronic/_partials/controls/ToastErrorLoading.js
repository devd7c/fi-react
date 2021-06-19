import React, {useEffect } from "react";
import clsx from 'clsx';
import { makeStyles, Button, Snackbar, SnackbarContent } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";

const variantIcon = {
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    color: '#9F6000',
    backgroundColor: '#FEEFB3',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, onReload, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <Button key="reload" aria-label="Reload" color="inherit" onClick={onReload}>
          Recargar
        </Button>,
      ]}
      {...other}
    />
  );
}
export function ToastErrorLoading({isError, text }) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(isError);
  }, [isError]);

  function handleReload(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    window.location.reload();
    setOpen(false);
  }
  return (
    <div>
    <Snackbar
    anchorOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    open={open}
    autoHideDuration={6000}
  >
    <MySnackbarContentWrapper
      onReload={handleReload}
      variant="warning"
      message={text}
    />
  </Snackbar>
    </div>
  );
}

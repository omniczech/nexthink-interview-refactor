import React, { useState } from "react";
import { SnackBarProps, Announcement, SnackBarClasses } from "./Snackbar.types";

const SnackBarCloseButton = ({
  variant,
  onclick,
  className,
}: {
  variant: "default" | "super_large" | "compact" | "dark" | "light";
  onclick: () => void;
  className: string;
}) => {
  return (
    <div className={variant === "super_large" ? "flex justify-end" : ""}>
      <button
        className={className}
        onClick={() => onclick()}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};

const SnackBarWrapper = ({
  variant,
  classNames,
  id,
  children,
}: {
  variant: "default" | "super_large" | "compact" | "dark" | "light";
  classNames: SnackBarClasses;
  id: string | undefined;
  children: React.ReactNode;
}) => {
  return (
    <div className={classNames.root} data-variant={variant} id={id}>
      <div className={classNames.container}>{children}</div>
    </div>
  );
};

const SnackBar = ({
  id,
  message,
  announcements = [],
  closable = false,
  variant = "default",
  classNames,
}: SnackBarProps) => {
  const [IsVisible, setIsVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  const [HasAnnouncements, setHasAnnouncements] = useState(
    announcements.length > 0,
  );

  if (!IsVisible) {
    return null;
  }

  const activeAnnouncement: Announcement | undefined =
    announcements.length > 0 ? announcements[idx] : undefined;

  const getMessageText = () => {
    if (activeAnnouncement?.message) {
      return activeAnnouncement.message;
    }
    return message;
  };

  const CloseSnackBar = () => {
    setIsVisible(false);
  };

  const isSuperLarge = variant === "super_large";

  return (
    <SnackBarWrapper variant={variant} classNames={classNames} id={id}>
      {isSuperLarge ? (
        <header className="mb-2">
          {activeAnnouncement && (
            <div className={classNames.overline}>
              {activeAnnouncement?.overline || "Announcement"}
            </div>
          )}
        </header>
      ) : null}
      <div className={classNames.content}>
        {!isSuperLarge && activeAnnouncement?.overline && (
          <div className={classNames.overline}>
            {activeAnnouncement.overline}
          </div>
        )}

        <div className={classNames.message}>{getMessageText()}</div>
        {closable && (
          <SnackBarCloseButton
            variant={variant}
            onclick={() => CloseSnackBar()}
            className={classNames.close}
          />
        )}
      </div>
    </SnackBarWrapper>
  );
};

export default SnackBar;

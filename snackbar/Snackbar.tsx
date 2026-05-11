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
  const isSuperLarge = variant === "super_large";
  const [IsVisible, setIsVisible] = useState(true);
  const [idx, setIdx] = useState(0); // I'm leaving this here because it seems to indicate a rotating function where this component cycles through the announcements.

  const HasAnnouncements = announcements.length > 0; // The component will re-render if this prop changes, so unless there's a feature added to change them from either this component or the children, this can just be a const.

  if (!IsVisible || (!HasAnnouncements && !message)) {
    // second check here is to prevent the SnackBar from showing up if there's no message AND no announcements.
    return null;
  }

  const activeAnnouncement: Announcement | undefined = HasAnnouncements
    ? announcements[idx] // this implies some sort of rotating announcements, which is not implemented. If there's no plan to do so, I would just change this line to announcements[0] and remove the idx state.
    : undefined;
  const getMessageText = () => {
    return activeAnnouncement?.message || message; // I prefer the oneliner here, this could be a code style preference.
  };

  const CloseSnackBar = () => {
    setIsVisible(false);
  };

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

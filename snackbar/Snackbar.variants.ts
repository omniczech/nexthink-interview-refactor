import { SnackBarVariantProps, SnackBarClasses } from "./Snackbar.types";

export const variants: {
  props: SnackBarVariantProps;
  classNames: SnackBarClasses;
}[] = [
  {
    props: {
      variant: "default",
    },
    classNames: {
      root: "bg-blue-600 text-white",
      container: "flex items-center justify-between p-4",
      content: "flex flex-col gap-1",
      overline: "text-sm opacity-80",
      message: "font-bold",
      close: "ml-4",
    },
  },
  {
    props: {
      variant: "super_large",
    },
    classNames: {
      root: "bg-gray-100 text-black",
      container: "p-6 border border-gray-300",
      overline: "uppercase tracking-wide text-xs",
      message: "text-lg font-semibold",
      close: "text-sm underline",
      content: "",
    },
  },
  {
    props: {
      variant: "compact",
    },
    classNames: {
      root: "bg-blue-600 text-white",
      container: "flex items-center justify-between px-3 py-2",
      content: "flex flex-col gap-0.5",
      overline: "text-xs opacity-70",
      message: "text-sm font-medium",
      close: "ml-2 text-xs",
    },
  },
];

export default variants;

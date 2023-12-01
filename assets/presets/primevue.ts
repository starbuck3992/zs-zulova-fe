const TRANSITIONS = {
  overlay: {
    enterFromClass: "opacity-0 scale-75",
    enterActiveClass:
      "transition-transform transition-opacity duration-150 ease-in",
    leaveActiveClass: "transition-opacity duration-150 ease-linear",
    leaveToClass: "opacity-0",
  },
};

export default {
  galleria: {
    root: "flex flex-col",
    content: "flex flex-col",
    itemwrapper: "flex flex-col relative",
    itemcontainer: "relative flex h-full",
    item: "flex justify-center items-center h-full w-full",
    thumbnailwrapper: "flex flex-col overflow-auto shrink-0",
    thumbnailcontainer: {
      class: ["flex flex-row", "bg-black/90 p-4"],
    },
    previousthumbnailbutton: {
      class: [
        "self-center flex shrink-0 justify-center items-center overflow-hidden relative",
        "m-2 bg-transparent text-white w-8 h-8 transition duration-200 ease-in-out rounded-full",
        "hover:bg-white/10 hover:text-white",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]",
      ],
    },
    thumbnailitemscontainer: "overflow-hidden w-full",
    thumbnailitems: "flex",
    thumbnailitem: {
      class: [
        "overflow-auto flex items-center justify-center cursor-pointer opacity-50",
        "flex-1 grow-0 shrink-0 w-20",
        "hover:opacity-100 hover:transition-opacity hover:duration-300",
      ],
    },
    nextthumbnailbutton: {
      class: [
        "self-center flex shrink-0 justify-center items-center overflow-hidden relative",
        "m-2 bg-transparent text-white w-8 h-8 transition duration-200 ease-in-out rounded-full",
        "hover:bg-white/10 hover:text-white",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]",
      ],
    },
    indicators: {
      class: ["flex items-center justify-center", "p-4"],
    },
    indicator: "mr-2",
    indicatorbutton: ({ context }) => ({
      class: [
        "w-4 h-4 transition duration-200 rounded-full",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
        {
          "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600":
            !context.highlighted,
          "bg-blue-500 hover:bg-blue-600": context.highlighted,
        },
      ],
    }),
    mask: {
      class: [
        "fixed top-0 left-0 w-full h-full",
        "flex items-center justify-center",
        "bg-black",
      ],
    },
    closebutton: {
      class: [
        "absolute top-5 right-5 flex justify-center items-center overflow-hidden m-2",
        "text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out",
        "hover:text-white hover:bg-white/10",
        "focus:outline-none focus:outline-offset-0",
      ],
    },
    closeicon: "w-6 h-6",
    previousitembutton: {
      class: [
        "inline-flex justify-center items-center overflow-hidden",
        "bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md mx-2",
        "fixed top-1/2 mt-[-0.5rem]",
        "left-0",
        "hover:bg-white/10 hover:text-white",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]",
      ],
    },
    nextitembutton: {
      class: [
        "inline-flex justify-center items-center overflow-hidden",
        "bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md mx-2",
        "fixed top-1/2 mt-[-0.5rem]",
        "right-0",
        "hover:bg-white/10 hover:text-white",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]",
      ],
    },
    caption: {
      class: ["absolute bottom-0 left-0 w-full", "bg-black/50 text-white p-4"],
    },
    transition: {
      enterFromClass: "opacity-0 scale-75",
      enterActiveClass: "transition-all duration-150 ease-in-out",
      leaveActiveClass: "transition-all duration-150 ease-in",
      leaveToClass: "opacity-0 scale-75",
    },
  },
  button: {
    root: ({ props, context }) => ({
      class: [
        "items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom",
        "transition duration-200 ease-in-out",
        "focus:outline-none focus:outline-offset-0",
        {
          "text-white dark:text-gray-900 bg-blue-500 dark:bg-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:border-blue-600 dark:hover:border-blue-500 focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(147,197,253,0.7),0_1px_2px_0_rgba(0,0,0,0)]":
            !props.link &&
            props.severity === null &&
            !props.text &&
            !props.outlined &&
            !props.plain,
          "text-blue-600 bg-transparent border-transparent focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(147,197,253,0.7),0_1px_2px_0_rgba(0,0,0,0)]":
            props.link,
        },
        {
          "focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(176,185,198,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(203,213,225,0.7),0_1px_2px_0_rgba(0,0,0,0)]":
            props.severity === "secondary",
          "focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(136,234,172,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(134,239,172,0.7),0_1px_2px_0_rgba(0,0,0,0)]":
            props.severity === "success",
          "focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(147,197,253,0.7),0_1px_2px_0_rgba(0,0,0,0)]":
            props.severity === "info",
          "focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(250,207,133,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(252,211,77,0.7),0_1px_2px_0_rgba(0,0,0,0)]":
            props.severity === "warning",
          "focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(212,170,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(216,180,254,0.7),0_1px_2px_0_rgba(0,0,0,0)]":
            props.severity === "help",
          "focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(247,162,162,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(252,165,165,0.7),0_1px_2px_0_rgba(0,0,0,0)]":
            props.severity === "danger",
        },
        {
          "text-white dark:text-gray-900 bg-gray-500 dark:bg-gray-400 border border-gray-500 dark:border-gray-400 hover:bg-gray-600 dark:hover:bg-gray-500 hover:border-gray-600 dark:hover:border-gray-500":
            props.severity === "secondary" &&
            !props.text &&
            !props.outlined &&
            !props.plain,
          "text-white dark:text-gray-900 bg-green-500 dark:bg-green-400 border border-green-500 dark:border-green-400 hover:bg-green-600 dark:hover:bg-green-500 hover:border-green-600 dark:hover:border-green-500":
            props.severity === "success" &&
            !props.text &&
            !props.outlined &&
            !props.plain,
          "text-white dark:text-gray-900 dark:bg-blue-400 bg-blue-900 dark:bg-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-400 hover:border-blue-400 dark:hover:bg-blue-500 dark:hover:border-blue-500":
            props.severity === "info" &&
            !props.text &&
            !props.outlined &&
            !props.plain,
          "text-white dark:text-gray-900 bg-orange-500 dark:bg-orange-400 border border-orange-500 dark:border-orange-400 hover:bg-orange-600 dark:hover:bg-orange-500 hover:border-orange-600 dark:hover:border-orange-500":
            props.severity === "warning" &&
            !props.text &&
            !props.outlined &&
            !props.plain,
          "text-white dark:text-gray-900 bg-purple-500 dark:bg-purple-400 border border-purple-500 dark:border-purple-400 hover:bg-purple-600 dark:hover:bg-purple-500 hover:border-purple-600 dark:hover:border-purple-500":
            props.severity === "help" &&
            !props.text &&
            !props.outlined &&
            !props.plain,
          "text-white dark:text-gray-900 bg-red-500 dark:bg-red-400 border border-red-500 dark:border-red-400 hover:bg-red-600 dark:hover:bg-red-500 hover:border-red-600 dark:hover:border-red-500":
            props.severity === "danger" &&
            !props.text &&
            !props.outlined &&
            !props.plain,
        },
        { "shadow-lg": props.raised },
        { "rounded-md": !props.rounded, "rounded-full": props.rounded },
        {
          "bg-transparent border-transparent": props.text && !props.plain,
          "text-blue-500 dark:text-blue-400 hover:bg-blue-300/20":
            props.text &&
            (props.severity === null || props.severity === "info") &&
            !props.plain,
          "text-gray-500 dark:text-gray-400 hover:bg-gray-300/20":
            props.text && props.severity === "secondary" && !props.plain,
          "text-green-500 dark:text-green-400 hover:bg-green-300/20":
            props.text && props.severity === "success" && !props.plain,
          "text-orange-500 dark:text-orange-400 hover:bg-orange-300/20":
            props.text && props.severity === "warning" && !props.plain,
          "text-purple-500 dark:text-purple-400 hover:bg-purple-300/20":
            props.text && props.severity === "help" && !props.plain,
          "text-red-500 dark:text-red-400 hover:bg-red-300/20":
            props.text && props.severity === "danger" && !props.plain,
        },
        { "shadow-lg": props.raised && props.text },
        {
          "text-gray-500 hover:bg-gray-300/20": props.plain && props.text,
          "text-gray-500 border border-gray-500 hover:bg-gray-300/20":
            props.plain && props.outlined,
          "text-white bg-gray-500 border border-gray-500 hover:bg-gray-600 hover:border-gray-600":
            props.plain && !props.outlined && !props.text,
        },
        {
          "bg-transparent border": props.outlined && !props.plain,
          "text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-300/20":
            props.outlined &&
            (props.severity === null || props.severity === "info") &&
            !props.plain,
          "text-gray-500 dark:text-gray-400 border border-gray-500 dark:border-gray-400 hover:bg-gray-300/20":
            props.outlined && props.severity === "secondary" && !props.plain,
          "text-green-500 dark:text-green-400 border border-green-500 dark:border-green-400 hover:bg-green-300/20":
            props.outlined && props.severity === "success" && !props.plain,
          "text-orange-500 dark:text-orange-400 border border-orange-500 dark:border-orange-400 hover:bg-orange-300/20":
            props.outlined && props.severity === "warning" && !props.plain,
          "text-purple-500 dark:text-purple-400 border border-purple-500 dark:border-purple-400 hover:bg-purple-300/20":
            props.outlined && props.severity === "help" && !props.plain,
          "text-red-500 dark:text-red-400 border border-red-500 dark:border-red-400 hover:bg-red-300/20":
            props.outlined && props.severity === "danger" && !props.plain,
        },
        {
          "px-4 py-3 text-base": props.size === null,
          "text-xs py-2 px-3": props.size === "small",
          "text-xl py-3 px-4": props.size === "large",
        },
        { "flex-column": props.iconPos == "top" || props.iconPos == "bottom" },
        { "opacity-60 pointer-events-none cursor-default": context.disabled },
      ],
    }),
    label: ({ props }) => ({
      class: [
        "flex-1",
        "duration-200",
        "font-bold",
        {
          "hover:underline": props.link,
        },
        { "invisible w-0": props.label == null },
      ],
    }),
    icon: ({ props }) => ({
      class: [
        "mx-0",
        {
          "mr-2": props.iconPos == "left" && props.label != null,
          "ml-2 order-1": props.iconPos == "right" && props.label != null,
          "mb-2": props.iconPos == "top" && props.label != null,
          "mt-2 order-2": props.iconPos == "bottom" && props.label != null,
        },
      ],
    }),
    badge: ({ props }) => ({
      class: [
        {
          "ml-2 w-4 h-4 leading-none flex items-center justify-center":
            props.badge,
        },
      ],
    }),
  },
  calendar: {
    root: ({ props }) => ({
      class: [
        "inline-flex max-w-full relative",
        {
          "opacity-60 select-none pointer-events-none cursor-default":
            props.disabled,
        },
      ],
    }),
    input: {
      class: [
        "font-sans text-base text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg",
        "hover:border-blue-500", //Hover
      ],
    },
    panel: ({ props }) => ({
      class: [
        "bg-white dark:bg-gray-900",
        "min-w-[350px]",
        {
          "shadow-md border-0 absolute": !props.inline,
          "inline-block overflow-x-auto border border-gray-300 dark:border-blue-900/40 p-2 rounded-lg":
            props.inline,
        },
      ],
    }),
    header: {
      class: [
        "flex items-center justify-between",
        "p-2 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-semibold m-0 border-b border-gray-300 dark:border-blue-900/40 rounded-t-lg",
      ],
    },
    previousbutton: {
      class: [
        "flex items-center justify-center cursor-pointer overflow-hidden relative",
        "w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
        "hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ",
      ],
    },
    title: "leading-8 mx-auto",
    monthTitle: {
      class: [
        "text-gray-700 dark:text-white/80 transition duration-200 font-semibold p-2",
        "mr-2",
        "hover:text-blue-500",
      ],
    },
    yearTitle: {
      class: [
        "text-gray-700 dark:text-white/80 transition duration-200 font-semibold p-2",
        "hover:text-blue-500",
      ],
    },
    nextbutton: {
      class: [
        "flex items-center justify-center cursor-pointer overflow-hidden relative",
        "w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
        "hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ",
      ],
    },
    table: {
      class: ["border-collapse w-full", "my-2"],
    },
    tableheadercell: "p-2",
    weekday: "text-gray-600 dark:text-white/70",
    day: "p-2",
    daylabel: ({ context }) => ({
      class: [
        "w-10 h-10 rounded-full transition-shadow duration-200 border-transparent border",
        "flex items-center justify-center mx-auto overflow-hidden relative",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
        {
          "opacity-60 cursor-default": context.disabled,
          "cursor-pointer": !context.disabled,
        },
        {
          "text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80":
            !context.selected && !context.disabled,
          "text-blue-700 bg-blue-100 hover:bg-blue-200":
            context.selected && !context.disabled,
        },
      ],
    }),
    monthpicker: "my-2",
    month: ({ context }) => ({
      class: [
        "w-1/3 inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
        "p-2 transition-shadow duration-200 rounded-lg",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
        {
          "text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80":
            !context.selected && !context.disabled,
          "text-blue-700 bg-blue-100 hover:bg-blue-200":
            context.selected && !context.disabled,
        },
      ],
    }),
    yearpicker: {
      class: ["my-2"],
    },
    year: ({ context }) => ({
      class: [
        "w-1/2 inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
        "p-2 transition-shadow duration-200 rounded-lg",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
        {
          "text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80":
            !context.selected && !context.disabled,
          "text-blue-700 bg-blue-100 hover:bg-blue-200":
            context.selected && !context.disabled,
        },
      ],
    }),
    timepicker: {
      class: [
        "flex justify-center items-center",
        "border-t-1 border-solid border-gray-300 p-2",
      ],
    },
    separatorcontainer: "flex items-center flex-col px-2",
    separator: "text-xl",
    hourpicker: "flex items-center flex-col px-2",
    minutepicker: "flex items-center flex-col px-2",
    ampmpicker: "flex items-center flex-col px-2",
    incrementbutton: {
      class: [
        "flex items-center justify-center cursor-pointer overflow-hidden relative",
        "w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
        "hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ",
      ],
    },
    decrementbutton: {
      class: [
        "flex items-center justify-center cursor-pointer overflow-hidden relative",
        "w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
        "hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ",
      ],
    },
    groupcontainer: "flex",
    group: {
      class: [
        "flex-1",
        "border-l border-gray-300 pr-0.5 pl-0.5 pt-0 pb-0",
        "first:pl-0 first:border-l-0",
      ],
    },
    transition: TRANSITIONS.overlay,
  },
};

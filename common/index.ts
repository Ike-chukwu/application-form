
export const openSidebar = () => {
  document.getElementById("sidebar")?.classList.add("expanded");
};

export const closeSidebar = () => {
  document.getElementById("sidebar")?.classList.remove("expanded");
};

export const toggleSidebar = () => {
  if (document.getElementById("sidebar")?.classList.contains("expanded")) {
    closeSidebar();
  } else {
    openSidebar();
  }
};

export const changeArrayShape = (
  prop: string,
  arr: Array<any>,
  shape: any = {},
) => {
  const newShape = arr?.reduce((acc, curr) => {
    shape[curr[prop]] = curr;

    return acc;
  }, shape);

  return newShape || [];
};

export enum FileStatus {
  SELECTED = "selected",
  UPLOADING = "uploading",
  UPLOADED = "uploaded",
  ERROR = "error",
}

export const formatNumberWithCurrency = (num: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(num);
};




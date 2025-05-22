export type Step = {
  stepNumber: number;
  title: string;
  tabOptions: string[];
  status: "In Progress" | "Completed" | "Waiting" | "Failed";
};

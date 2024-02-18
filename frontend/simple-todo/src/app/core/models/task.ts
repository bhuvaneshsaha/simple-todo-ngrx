export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TTask = {
  id: number,
  date: string,
  description: string,
  dateCreated: string,
  deadline: string,
  status: string,
  dateCompleted?: string,
}

export type TDay = {
  date: string,
  tasks: TTask[],
}


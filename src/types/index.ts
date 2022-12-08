export type TTask = {
  description: string,
  dateCreated: string,
  deadline: string,
  status: string,
  dateCompleted?: string,
}

export type TDay = {
  tasks: TTask[],
}

export type TUser = {
  days: TDay[],
}
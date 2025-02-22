export type TSetting = {
  label: string,
  type: string,
  required: boolean,
  default: string,
  description: string
}

export type TBoard = {
  id: string,
  name: string,
  desc: string
}

export type TCard = {
  id: string,
  name: string,
  due: string | null,
  dateLastActivity: string
}

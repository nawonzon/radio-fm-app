export interface Country {
  name: string
  alpha2Code: string
  flag: string
}

export interface Station {
  id: string
  name: string
  tags: string[]
  url: string
  favicon: string
}
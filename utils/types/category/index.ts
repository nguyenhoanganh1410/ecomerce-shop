export interface IRootCategory {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  parents?: Parents;
  slug: Slug;
  title: string;
}

export interface Parents {
  _ref: string;
  _type: string;
}

export interface Slug {
  _type: string;
  current: string;
}

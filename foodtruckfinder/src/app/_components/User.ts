class User {
  username: string;
  location: string;
  roles: string[];
  image: string;

  public constructor(
    username: string,
    location: string,
    roles: string[],
    image?: string
  ) {
    this.username = username;
    this.location = location;
    this.roles = roles;
    this.image =
      image ??
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  }
}

export default User;

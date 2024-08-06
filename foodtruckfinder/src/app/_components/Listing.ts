class Listing {
  protected id: number;
  protected name: string;
  protected description: string;
  protected location: string;
  protected image: string;
  protected breed: string;
  protected hasChanged = false;
  protected listingOwner: string;

  public constructor(
    id: number,
    name: string,
    description: string,
    location: string,
    image: string,
    breed: string,
    listingOwner: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.image = image;
    this.breed = breed;
    this.listingOwner = listingOwner;
  }

  get getId(): number {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
    this.hasChanged = true;
  }

  get getDescription(): string {
    return this.description;
  }

  set setDescription(description: string) {
    this.description = description;
    this.hasChanged = true;
  }

  get getLocation(): string {
    return this.location;
  }

  set setLocation(location: string) {
    this.location = location;
    this.hasChanged = true;
  }

  get getImage(): string {
    return this.image;
  }

  set setImage(image: string) {
    this.image = image;
    this.hasChanged = true;
  }

  get getBreed(): string {
    return this.breed;
  }

  set setBreed(breed: string) {
    this.breed = breed;
    this.hasChanged = true;
  }

  get getListingOwner(): string {
    return this.listingOwner;
  }
}

export default Listing;

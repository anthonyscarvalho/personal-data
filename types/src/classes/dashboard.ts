export class Dashboard {
  totalGalleries: number;
  galleries: any[];
  totalProfiles: number;
  profiles: any[];
  totalStudios: number;
  studios: any[];

  constructor(pModel: any = null) {
    this.totalGalleries = pModel?.totalGalleries || null;
    this.galleries = pModel?.galleries || null;
    this.totalProfiles = pModel?.totalProfiles || null;
    this.profiles = pModel?.profiles || null;
    this.totalStudios = pModel?.totalStudios || null;
    this.studios = pModel?.studios || null;
  }
}

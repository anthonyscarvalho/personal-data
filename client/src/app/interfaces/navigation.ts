export interface NavigationInterface {
  icon: string;
  name: string;
  link: string;
  children?: NavigationInterface[];
  showChildren?: boolean;
}

import { proxy } from "valtio";

interface StateType {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
}

const state = proxy<StateType>({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: true,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});

export default state;

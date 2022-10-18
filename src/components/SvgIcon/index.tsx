import sprite from './sprite.svg';

export interface IProps {
  icon:
    | 'messages'
    | 'profile-2user'
    | 'user'
    | 'arrow-down'
    | 'arrow-up'
    | 'arrow-left'
    | 'logout'
    | 'trash'
    | 'edit'
    | 'publish'
    | 'unpublish'
    | 'info'
    | 'error'
    | 'mobile-menu'
    | 'cancel'
    | 'success'
    | 'info'
    | 'error'
    | 'eye-slash'
    | 'eye';
  size?: number;
  color?: string;
}

function SvgIcon({ icon, size = 24, color = 'inherit' }: IProps) {
  return (
    <svg width={size} height={size} fill={color} name={icon}>
      <use xlinkHref={`${sprite}#${icon}`}></use>
    </svg>
  );
}

export default SvgIcon;

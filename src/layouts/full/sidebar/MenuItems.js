import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Home',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  /*{
    id: uniqueId(),
    title: 'Materias',
    icon: IconTypography,
    href: '/ui/typography',
  },*/
  {
    id: uniqueId(),
    title: 'Materias',
    icon: IconTypography,
    href: '/materia',
  },
  {
    id: uniqueId(),
    title: 'Grado',
    icon: IconTypography,
    href: '/grade',
  },
  {
    id: uniqueId(),
    title: 'Seccion',
    icon: IconTypography,
    href: '/section',
  },
  {
    id: uniqueId(),
    title: 'Profesores',
    icon: IconTypography,
    href: '/teacher',
  },
  /*{
    id: uniqueId(),
    title: 'Estudiantes',
    icon: IconCopy,
    href: '/ui/shadow',
  },*/
  {
    id: uniqueId(),
    title: 'Estudiantess',
    icon: IconCopy,
    href: '/student',
  },
  {
    id: uniqueId(),
    title: 'Asignaturas Profesor',
    icon: IconCopy,
    href: '/subjectTeacher',
  },
  {
    id: uniqueId(),
    title: 'Matricula Estudiante',
    icon: IconCopy,
    href: '/subjectStudent',
  },
  {
    id: uniqueId(),
    title: 'Nota Estudiante',
    icon: IconCopy,
    href: '/assignNotes',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Estudiantes',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;

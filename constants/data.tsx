import { MobileIcon, MixIcon, LockClosedIcon, LightningBoltIcon } from '@radix-ui/react-icons';

export const featuresData = [
  {
    icon: <MobileIcon width={48} height={48} className="text-gray-700 scale-75 translate-x-[10%] translate-y-[10%]" />,
    title: 'PWA Support',
    desc: 'Add bookabulary PWA to your phone'
  },
  {
    icon: <LockClosedIcon width={48} height={48} className="text-gray-700 scale-75 translate-x-[10%] translate-y-[10%]" />,
    title: 'Private or public',
    desc: 'you can create private or public vocabularies based on your prefrences'
  },
  {
    icon: <MixIcon width={48} height={48} className="text-gray-700 scale-75 translate-x-[10%] translate-y-[10%]" />,
    title: 'Unlimited',
    desc: 'You can create unlimited collections of books and vocabularies'
  },
  {
    icon: <LightningBoltIcon width={48} height={48} className="text-gray-700 scale-75 translate-x-[10%] translate-y-[10%]" />,
    title: 'Blazing fast',
    desc: 'Bookabulary uses latest technologies and platforms and it is realy fast'
  }
]

export const faqData = [
  {
    question: 'Is this app free?',
    answer: 'Yepp.Bookabulary is free and we try to keep it that way.'
  },
  {
    question: 'Is this app only for books?',
    answer: 'No, the original idea for this application was for books but there is no limitation to that you can create any collections you like just like you create books and create as many vocabulary sets as you like.'
  },
  {
    question: 'Can i have private vocabularies that others can not see?',
    answer: 'Yes,you define your vocabularies either private or public, default is public.'
  },
  {
    question: 'Is there a limit to create vocabulary collections?',
    answer: 'No, you can create as much as you like.'
  }
]

export const mainMenuItems = [
  {
    title: 'About',
    link: '/about'
  },
  {
    title: 'Book Hub',
    link: '/books',
  },
]
export const profileMenuItems = [
  {
    title: 'Setting',
    link: '/user/profile'
  },
  {
    title: 'Your books',
    link: '/user/archive'
  },
]
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@radix-ui/react-icons';

const Faq = ({ data }) => {
  return (
    data.map(item => {
      return (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-lime-100 px-4 py-4 my-2 text-left text-lg font-medium text-lime-900 hover:bg-lime-200 focus:outline-none focus-visible:ring focus-visible:ring-lime-500 focus-visible:ring-opacity-75">
                <span>{item.question}</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-lime-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 py-4 my-2 pb-2 text-lg text-gray-500 dark:text-white">
                {item.answer}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )
    })
  )
}

export default Faq;
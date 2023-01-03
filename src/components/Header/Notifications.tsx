import React from 'react'
import { BsBellFill } from 'react-icons/bs'

import { Container, Notifications } from './styles'
import { INotifications } from 'interfaces/types';
import moment from 'moment';


interface NotificationsProps{
  hasNotificationsNotVisualized:boolean | undefined
  updateNotifications():void
  notifications:INotifications[] | undefined
}


const NotificationsContent:React.FC<NotificationsProps> = ({hasNotificationsNotVisualized,updateNotifications,notifications}) =>{
  return(
    <Notifications hasNotificatons={hasNotificationsNotVisualized} className="rounded-xl dropdown dropdown-end  ">
      <label tabIndex={0} className=" m-1 ">
        <BsBellFill onClick={updateNotifications}  cursor={"pointer"} className='newNotification'/>
      </label>
      <ul tabIndex={0} className="rounded-xl   dropdown-content menu  bg-base-100 w-64">
        <div>
          <header className=' p-3 text-base font-bold rounded-t-xl w-full bg-gold100 h-16 flex items-center justify-start'>
            CENTRAL DE NOTIFICAÇÕES
          </header>
          <div className='overflow-y-auto h-64'>
          { !!notifications?.length ?
          notifications?.map((notification) =>{
              return(
                <div key={notification?.id} className='p-3 border-gray-200 border-b-2 '>
                <div className='w-full justify-between flex gap-2 items-center mb-3'>
                  <p className='text-base font-bold'><>{notification.solicitation?.status}</></p>
                  <span className='text-gray-300 text-sm '><>{ 
                  moment(notification.solicitation?.createdAt).format('DD/MM - H') + 'h'
                  }</></span>
                </div>
                <div className='text-xs'>
                  {notification.description}
                </div>
              </div>
              )
          })
          :
          <div className='w-full h-full flex items-center justify-center'>Nenhuma notificação</div>
          }
          </div>
        </div>
      </ul>
    </Notifications>
  )
}
export {NotificationsContent} 
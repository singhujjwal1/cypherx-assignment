import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiOutlineUser, HiOutlineBadgeCheck, HiOutlineCalendar } from 'react-icons/hi';

const DataDisplay = ({ displayMode, theme, toggleTheme }) => {
  const [ticketAndUserData, setTicketAndUserData] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [priorityMap, setPriorityMap] = useState({
    0: 'No Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers');
        setTicketAndUserData(response.data);

        const userMapping = response.data.users.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});
        setUserMap(userMapping);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Ticket and User Data:', ticketAndUserData);
  }, [ticketAndUserData]);

  const [groupedAndOrderedData, setGroupedAndOrderedData] = useState([]);

  useEffect(() => {
    let newData;
    switch (displayMode) {
      case 'group-by-status':
        newData = groupDataBy('status', ticketAndUserData.tickets);
        break;
      case 'group-by-user':
        newData = groupDataBy('userId', ticketAndUserData.tickets);
        break;
      case 'group-by-priority':
        newData = groupDataBy('priority', ticketAndUserData.tickets);
        break;
      default:
        newData = groupDataBy('status', ticketAndUserData.tickets);
    }

    setGroupedAndOrderedData(newData);
  }, [displayMode, ticketAndUserData]);

  const groupDataBy = (property, data) => {
    const groupedData = {};
    data?.forEach((item) => {
      let key;
      if (property === 'userId') {
        key = userMap[item[property]] || 'Unknown User';
      } else if (property === 'priority') {
        key = priorityMap[item[property]];
      } else {
        key = item[property];
      }

      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });

    const orderedData = orderDataBy('title', 'asc', groupedData);
    return orderedData;
  };

  const orderDataBy = (property, order, groupedData) => {
    const orderedData = Object.entries(groupedData).reduce((acc, [key, items]) => {
      const sortedItems = items.sort((a, b) => {
        if (order === 'asc') {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] < b[property] ? 1 : -1;
        }
      });
      acc[key] = sortedItems;
      return acc;
    }, {});

    return orderedData;
  };

  return (
    <div className={`container mx-auto p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {Object.entries(groupedAndOrderedData).map(([groupKey, groupItems]) => (
        <div key={groupKey} className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {displayMode === 'group-by-status' && (
              <>
                {groupKey === 'Todo' && <HiOutlineCalendar className="inline-block mr-2" />}
                {groupKey === 'In progress' && <HiOutlineBadgeCheck className="inline-block mr-2" />}
                {groupKey === 'Done' && <HiOutlineBadgeCheck className="inline-block mr-2" />}
                {groupKey === 'Backlog' && <HiOutlineCalendar className="inline-block mr-2" />}
                {groupKey === 'Cancelled' && <HiOutlineBadgeCheck className="inline-block mr-2" />}
              </>
            )}
            {displayMode === 'group-by-user' && (
              <>
              </>
            )}
            {displayMode === 'group-by-priority' && (
              <>
                {groupKey === 'Low' && <HiOutlineCalendar className="inline-block mr-2" />}
                {groupKey === 'Medium' && <HiOutlineCalendar className="inline-block mr-2" />}
                {groupKey === 'High' && <HiOutlineBadgeCheck className="inline-block mr-2" />}
                {groupKey === 'Urgent' && <HiOutlineBadgeCheck className="inline-block mr-2" />}
                {groupKey === 'No Priority' && <HiOutlineCalendar className="inline-block mr-2" />}
              </>
            )}
            {groupKey}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {groupItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white p-4 rounded shadow ${theme === 'dark' ? 'text-white' : 'text-gray-800'} ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <p className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {item.title}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Ticket ID: {item.id}</p>
                {displayMode === 'group-by-user' && (
                  <p className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <HiOutlineUser className="mr-2" /> {userMap[item.userId] || 'Unknown User'}
                  </p>
                )}
                {displayMode === 'group-by-priority' && (
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Priority: {groupKey}</p>
                )}
                {/* Add more details as needed */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;

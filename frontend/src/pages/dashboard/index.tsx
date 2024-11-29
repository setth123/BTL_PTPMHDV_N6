// import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Activity from 'components/sections/dashboard/activity';
// import TaskToday from 'components/sections/dashboard/task-today';
// import RunningTask from 'components/sections/dashboard/running-task';
// import UpcomingTask from 'components/sections/dashboard/upcoming-task';
// import WeekCalendar from 'components/sections/dashboard/week-calendar';
// import TaskOverview from 'components/sections/dashboard/task-overview';
// import MonthlyMentors from 'components/sections/dashboard/monthly-mentors';
// import Footer from 'components/common/Footer';

const Dashboard = () => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }}>
      <Stack p={3.5} spacing={3.5} direction="column" width={{ xs: 1, md: 'calc(100% - 460px)' }}>
        <Stack
          width={1}
          spacing={3.5}
          direction={{ xs: 'column', sm: 'row', md: 'column', xl: 'row' }}
        >
          {/* <RunningTask />
          <Activity /> */}
        </Stack>

        {/* <MonthlyMentors />
        <UpcomingTask />
        <TaskOverview /> */}

        {/* <Box display={{ xs: 'none', md: 'block' }}>
          <Footer />
        </Box> */}
      </Stack>
    </Stack>
  );
};

export default Dashboard;

import { FiTrash2 } from 'react-icons/fi';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/apiSlice';
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
function ListItem({ friend }) {
  const dispatch = useDispatch();
  return (
    <Card sx={{ width: '80%' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          boxSizing: 'border-box',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Avatar
          variant="rounded"
          src="avatar1.jpg"
          sx={{ marginRight: '10%' }}
        />
        <Stack spacing={0.5}>
          <Typography fontWeight={700}>{friend.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {friend.phoneNumber}
          </Typography>
        </Stack>
        <IconButton
          sx={{ marginLeft: 'auto' }}
          onClick={event => {
            dispatch(deleteContact(event.currentTarget.id));
          }}
          id={friend.id}
        >
          <FiTrash2 sx={{ marginRight: 0 }} />
        </IconButton>
      </Box>
    </Card>
  );
}
export default ListItem;

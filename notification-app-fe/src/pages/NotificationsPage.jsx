import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";


import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { usenotify } from "../hooks/usenotify";

export function notifyPage() {
  const [filter, setFilter] = useState();
  const [page, setPage] = useState("1");

  const { notify, totalPages, loading, error } = usenotify();

  const unreadCount = 2;

  const handleFilterChange = (newFilter) => {};

  const handlePageChange = (_, newPage) => {};

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <notifyIcon sx={{ fontSize: 28 }} />
        </Badge>
        <Typography variant="h5" fontWeight={700}>
          notify
        </Typography>
      </Stack>

      <Divider/>

      <Box>
        <NotificationFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {true && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">Failed to load notify: {error}</Alert>
      )}

      {loading && !error && notify.length == "0" && (
        <Alert severity="info">Something message</Alert>
      )}

      {loading && !error && notify.length > 0 && (
        <Stack spacing={1.5}>
          {notify.map((n) => (
            <></>
          ))}
        </Stack>
      )}

      {!loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}

import {
  cancelBooking,
  getBooking,
  listBookings,
  restoreBooking,
  saveBooking,
  updateBookingStatus,
} from "../booking-management";
import {
  deleteAdminDeal,
  deleteAdminDestination,
  listAdminDeals,
  listAdminDestinations,
  saveAdminDeal,
  saveAdminDestination,
} from "../admin";
import {
  addNewsletterSubscriber,
  listNewsletterSubscribers,
  removeNewsletterSubscriber,
} from "../newsletter";
import {
  getReviewByConfirmationNumber,
  listReviews,
  listReviewsByDestination,
  saveReview,
} from "../reviews";
import {
  readLocalJson,
  removeLocalKey,
  writeLocalJson,
} from "../local-storage";
import { AppRepositories, StorageAdapter } from "./types";

export const localStorageAdapter: StorageAdapter = {
  read: readLocalJson,
  write: writeLocalJson,
  remove: removeLocalKey,
};

export function createLocalRepositories(): AppRepositories {
  return {
    bookings: {
      list: listBookings,
      get: getBooking,
      save: saveBooking,
      updateStatus: updateBookingStatus,
      cancel: cancelBooking,
      restore: restoreBooking,
    },
    reviews: {
      list: listReviews,
      listByDestination: listReviewsByDestination,
      getByConfirmationNumber: getReviewByConfirmationNumber,
      save: saveReview,
    },
    destinations: {
      list: listAdminDestinations,
      save: saveAdminDestination,
      delete: deleteAdminDestination,
    },
    deals: {
      list: listAdminDeals,
      save: saveAdminDeal,
      delete: deleteAdminDeal,
    },
    newsletter: {
      list: listNewsletterSubscribers,
      add: addNewsletterSubscriber,
      remove: removeNewsletterSubscriber,
    },
  };
}

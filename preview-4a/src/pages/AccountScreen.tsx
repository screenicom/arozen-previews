import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  TrashIcon,
  XIcon } from
'lucide-react';
import { UserProfile } from '../types';
interface AccountScreenProps {
  user: UserProfile;
  onBack: () => void;
  onUpdateUser: (user: UserProfile) => void;
  onDeleteAccount: () => void;
}
export function AccountScreen({
  user,
  onBack,
  onUpdateUser,
  onDeleteAccount
}: AccountScreenProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const initials =
  `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase();
  return (
    <div className="flex flex-col h-full bg-arozen-grey relative">
      {/* Header */}
      <div className="bg-white px-4 pt-14 pb-4 flex justify-between items-center shadow-sm shadow-gray-200 z-10">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
          
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-gray-900 font-heading">
          My Account
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 phone-scroll">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm shadow-gray-200 border border-gray-200 text-center">
          <div className="w-20 h-20 bg-arozen-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl font-medium text-arozen-gold font-heading">
              {initials || 'A'}
            </span>
          </div>
          <h2 className="text-lg font-medium text-gray-900 font-heading">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-body">{user.email}</p>
        </div>

        {/* Account actions panel */}
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
          <AccountRow
            value="Edit Profile"
            onClick={() => setEditProfileOpen(true)} />
          
          <div className="h-px bg-black/[0.06]" />
          <AccountRow
            value="Change Password"
            onClick={() => setChangePasswordOpen(true)} />
          
        </div>

        {/* Danger Zone */}
        <div className="pt-2">
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full bg-transparent border border-arozen-danger/30 text-arozen-danger font-medium py-4 rounded-xl shadow-sm flex items-center justify-center space-x-2 active:scale-[0.98] transition-transform font-body">
            
            <TrashIcon className="w-5 h-5" />
            <span>Delete Account</span>
          </button>
          <p className="text-center text-xs text-gray-400 mt-3 px-4 font-body">
            Deleting your account will permanently remove all your data,
            including paired devices and schedules.
          </p>
        </div>

        <div className="h-4" />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editProfileOpen}
        user={user}
        onClose={() => setEditProfileOpen(false)}
        onSave={(updated) => {
          onUpdateUser(updated);
          setEditProfileOpen(false);
        }} />
      

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)} />
      

      {/* Delete Confirmation */}
      <AnimatePresence>
        {confirmDelete &&
        <>
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.2
            }}
            onClick={() => setConfirmDelete(false)}
            className="absolute inset-0 bg-black/40 z-40" />
          
            <motion.div
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}
            className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl z-50 px-6 pt-5 pb-8 shadow-2xl">
            
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 font-heading">
                  Delete Account?
                </h2>
                <button
                onClick={() => setConfirmDelete(false)}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close">
                
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 font-body mb-6">
                This action cannot be undone. All your data, devices, and
                schedules will be permanently removed.
              </p>
              <div className="space-y-2">
                <button
                onClick={onDeleteAccount}
                className="w-full bg-arozen-danger text-white font-medium py-4 rounded-xl shadow-lg shadow-arozen-danger/20 active:scale-[0.98] transition-transform font-body">
                
                  Delete Account
                </button>
                <button
                onClick={() => setConfirmDelete(false)}
                className="w-full bg-gray-100 text-gray-900 font-medium py-4 rounded-xl active:scale-[0.98] transition-transform font-body">
                
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}
interface AccountRowProps {
  value: string;
  onClick: () => void;
}
function AccountRow({ value, onClick }: AccountRowProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full px-6 py-5 flex items-center justify-between hover:bg-arozen-grey/40 transition-colors text-left">
      
      <p className="text-[17px] font-medium text-gray-900 font-heading tracking-tight leading-none">
        {value}
      </p>
      <ChevronRightIcon
        className="w-4 h-4 text-gray-300 group-hover:text-arozen-gold transition-colors"
        strokeWidth={1.25} />
      
    </button>);

}
/* ---------- Edit Profile Modal ---------- */
interface EditProfileModalProps {
  open: boolean;
  user: UserProfile;
  onClose: () => void;
  onSave: (user: UserProfile) => void;
}
function EditProfileModal({
  open,
  user,
  onClose,
  onSave
}: EditProfileModalProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  useEffect(() => {
    if (open) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [open, user]);
  const changed =
  firstName !== user.firstName ||
  lastName !== user.lastName ||
  email !== user.email;
  const handleSave = () => {
    if (!changed) return;
    onSave({
      firstName,
      lastName,
      email
    });
  };
  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 z-40" />
        
          <motion.div
          initial={{
            y: '100%'
          }}
          animate={{
            y: 0
          }}
          exit={{
            y: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300
          }}
          className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl z-50 px-6 pt-5 pb-8 shadow-2xl">
          
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900 font-heading">
                Edit Profile
              </h2>
              <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close">
              
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1 font-body">
                    First Name
                  </label>
                  <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow" />
                
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1 font-body">
                    Last Name
                  </label>
                  <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow" />
                
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1 font-body">
                  Email
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow" />
              
              </div>
            </div>

            <button
            onClick={handleSave}
            className="w-full bg-arozen-black text-white font-medium py-4 rounded-xl shadow-lg shadow-black/20 active:scale-[0.98] transition-transform font-body mt-8">
            
              Save Changes
            </button>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}
/* ---------- Change Password Modal ---------- */
interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}
function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (open) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSaved(false);
    }
  }, [open]);
  const passwordsMatch =
  newPassword.length > 0 && newPassword === confirmPassword;
  const valid =
  currentPassword.length > 0 && newPassword.length >= 8 && passwordsMatch;
  const showMismatch =
  confirmPassword.length > 0 && newPassword !== confirmPassword;
  const handleSave = () => {
    if (!valid) return;
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };
  return (
    <AnimatePresence>
      {open &&
      <>
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 z-40" />
        
          <motion.div
          initial={{
            y: '100%'
          }}
          animate={{
            y: 0
          }}
          exit={{
            y: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300
          }}
          className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl z-50 px-6 pt-5 pb-8 shadow-2xl">
          
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900 font-heading">
                Change Password
              </h2>
              <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close">
              
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1 font-body">
                  Current Password
                </label>
                <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow" />
              
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1 font-body">
                  New Password
                </label>
                <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow" />
              
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1 font-body">
                  Confirm New Password
                </label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-arozen-grey border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 font-body focus:outline-none focus:ring-2 focus:ring-arozen-gold focus:border-transparent transition-shadow" />
              
              </div>
              {showMismatch &&
            <p className="text-xs text-arozen-danger font-body">
                  Passwords do not match.
                </p>
            }
            </div>

            <button
            onClick={handleSave}
            className={`w-full font-medium py-4 rounded-xl font-body shadow-lg active:scale-[0.98] transition-transform mt-8 flex items-center justify-center space-x-2 ${saved ? 'bg-arozen-green text-white shadow-arozen-green/20' : 'bg-arozen-black text-white shadow-black/20'}`}>
            
              {saved ?
            <>
                  <CheckIcon className="w-4 h-4" />
                  <span>Password Updated</span>
                </> :

            <span>Update Password</span>
            }
            </button>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}
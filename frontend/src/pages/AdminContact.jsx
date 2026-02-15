import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { fetchAdminContacts, markContactAsRead, deleteContact } from '../utils/api';
import { Loader2, Trash2, Mail, MailOpen, X, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmationModal from '../components/admin/ConfirmationModal';

const AdminContact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    const getContacts = async () => {
        setLoading(true);
        try {
            const data = await fetchAdminContacts();
            setContacts(data);
        } catch (err) {
            console.error('Error fetching contacts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    const handleViewContact = async (contact) => {
        setSelectedContact(contact);
        if (!contact.isRead) {
            try {
                await markContactAsRead(contact.id);
                // Update local state to reflect read status
                setContacts(prev => prev.map(c =>
                    c.id === contact.id ? { ...c, isRead: true } : c
                ));
            } catch (err) {
                console.error('Failed to mark as read', err);
            }
        }
    };

    const handleDeleteClick = (e, contact) => {
        e.stopPropagation(); // Prevent opening the modal
        setContactToDelete(contact);
        setIsDeleteModalOpen(true);
    };

    const performDelete = async () => {
        if (!contactToDelete) return;
        try {
            await deleteContact(contactToDelete.id);
            setContacts(prev => prev.filter(c => c.id !== contactToDelete.id));
            if (selectedContact?.id === contactToDelete.id) {
                setSelectedContact(null);
            }
            setIsDeleteModalOpen(false);
            setContactToDelete(null);
        } catch (err) {
            console.error('Failed to delete contact', err);
            alert('Failed to delete contact');
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-zinc-900">
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 mb-1">Contact Messages</h1>
                    <p className="text-zinc-500 text-sm">Manage inquiries and messages from the contact form.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            ) : contacts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center">
                    <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-zinc-300" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">No Messages Yet</h3>
                    <p className="text-zinc-500 max-w-sm mx-auto">
                        When users submit the contact form, their messages will appear here.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50/50 border-b border-zinc-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Sender</th>
                                    <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-black text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {contacts.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        onClick={() => handleViewContact(contact)}
                                        className={`group hover:bg-zinc-50/80 transition-colors cursor-pointer ${!contact.isRead ? 'bg-indigo-50/30' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            {contact.isRead ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-500 text-[10px] font-bold uppercase tracking-wide">
                                                    <MailOpen className="w-3 h-3" /> Read
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-wide">
                                                    <Mail className="w-3 h-3" /> New
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className={`text-sm font-bold ${!contact.isRead ? 'text-indigo-900' : 'text-zinc-900'}`}>
                                                    {contact.name}
                                                </span>
                                                <span className="text-xs text-zinc-500">{contact.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm ${!contact.isRead ? 'font-semibold text-zinc-900' : 'text-zinc-600'}`}>
                                                {contact.subject}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-zinc-500">
                                                {new Date(contact.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={(e) => handleDeleteClick(e, contact)}
                                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="Delete Message"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Message Detail Modal */}
            <AnimatePresence>
                {selectedContact && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedContact(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
                        >
                            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">
                                <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                                    <h3 className="text-xl font-bold text-zinc-900">Message Details</h3>
                                    <button
                                        onClick={() => setSelectedContact(null)}
                                        className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-500 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-8 overflow-y-auto">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-zinc-900">{selectedContact.name}</h4>
                                                <p className="text-zinc-500 text-sm">{selectedContact.email}</p>
                                                <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400 font-medium bg-zinc-50 px-3 py-1.5 rounded-lg w-fit">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(selectedContact.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6">
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Subject</label>
                                            <p className="text-zinc-900 font-bold text-lg mb-6 border-b border-zinc-100 pb-4">
                                                {selectedContact.subject}
                                            </p>

                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Message</label>
                                            <p className="text-zinc-700 leading-relaxed whitespace-pre-wrap">
                                                {selectedContact.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 flex justify-end gap-3">
                                    <button
                                        onClick={(e) => {
                                            setSelectedContact(null);
                                            handleDeleteClick(e, selectedContact);
                                        }}
                                        className="px-5 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete Message
                                    </button>
                                    <button
                                        onClick={() => setSelectedContact(null)}
                                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={performDelete}
                title="Delete Message"
                message="Are you sure you want to delete this message? This action cannot be undone."
            />
        </AdminLayout>
    );
};

export default AdminContact;

// SettingsView.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import favicon from '../../../public/assets/favicon-32x32.png';

const generalSettingsItems = [
  { id: 'email', title: 'Email', subtitle: 'Change your email', defaultValue: 'nate@example.com' },
  { id: 'password', title: 'Password', subtitle: 'Change your password', defaultValue: '' },
  { id: 'dob', title: 'Date of Birth', subtitle: 'Change your date of birth', defaultValue: '2000-12-20' },
  { id: 'cellphone', title: 'Cellphone Number', subtitle: 'Change your cellphone number', defaultValue: '123-456-7890' },
];

const privacySettingsItems = [
  { id: 'visibility', title: 'Profile Visibility', subtitle: 'Set your profile visibility', options: ['Public', 'Private', 'Friends Only'] },
  { id: 'dataSharing', title: 'Data Sharing', subtitle: 'Manage data sharing preferences', options: ['Enabled', 'Disabled'] },
];

const SettingsView = ({ onChangeView }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
        {/*<div className="blur-overlay"></div>*/}
        <main className='bodyProfile'>
          <div className="containerProfile">
            <div className="cardProfile">
              <section className="settings">
                <h1>Settings</h1>
                <h2>General Settings</h2>
                <div>
                  {generalSettingsItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layoutId={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                        setSelectedCategory('general');
                      }}
                      className="settings-item"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.h5>{item.subtitle}</motion.h5>
                      <motion.h2>{item.title}</motion.h2>
                    </motion.div>
                  ))}
                </div>
                <h2>Privacy Settings</h2>
                <div>
                  {privacySettingsItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layoutId={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                        setSelectedCategory('privacy');
                      }}
                      className="settings-item"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.h5>{item.subtitle}</motion.h5>
                      <motion.h2>{item.title}</motion.h2>
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedId && (
                    <motion.div layoutId={selectedId} className="settings-detail">
                      <motion.h5>
                        {selectedCategory === 'general'
                          ? generalSettingsItems.find(item => item.id === selectedId).subtitle
                          : privacySettingsItems.find(item => item.id === selectedId).subtitle}
                      </motion.h5>
                      <motion.h2>
                        {selectedCategory === 'general'
                          ? generalSettingsItems.find(item => item.id === selectedId).title
                          : privacySettingsItems.find(item => item.id === selectedId).title}
                      </motion.h2>
                      <form>
                        {selectedCategory === 'general' && (
                          <label>
                            {generalSettingsItems.find(item => item.id === selectedId).title}:
                            <input
                              type={selectedId === 'password' ? 'password' : selectedId === 'dob' ? 'date' : 'text'}
                              defaultValue={generalSettingsItems.find(item => item.id === selectedId).defaultValue}
                            />
                          </label>
                        )}
                        {selectedCategory === 'privacy' && (
                          <label>
                            {privacySettingsItems.find(item => item.id === selectedId).title}:
                            <select defaultValue={privacySettingsItems.find(item => item.id === selectedId).options[0]}>
                              {privacySettingsItems.find(item => item.id === selectedId).options.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                              ))}
                            </select>
                          </label>
                        )}
                        <button type="submit">Save Changes</button>
                      </form>
                      <motion.button onClick={() => setSelectedId(null)}>Close</motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button className="back-button" onClick={onChangeView}>Back to Profile</button>
              </section>
            </div>
          </div>
        </main>
    </div>
  );
};

export default SettingsView;

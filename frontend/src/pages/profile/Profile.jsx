import React, { useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaEnvelope, FaCalendar, FaShield } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { currentUserData, updateUserProfile, changeUserPassword } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...currentUserData });
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...currentUserData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...currentUserData });
  };

  const handleSave = async () => {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address.street",
      "address.city",
      "address.state",
      "address.zipcode",
      "address.country",
    ];

    for (const field of requiredFields) {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        if (
          !editData[parent] ||
          !editData[parent][child] ||
          editData[parent][child].trim() === ""
        ) {
          toast.error(
            `Please fill in the ${child
              .replace(/([A-Z])/g, " $1")
              .toLowerCase()} field`
          );
          return;
        }
      } else {
        if (!editData[field] || editData[field].trim() === "") {
          toast.error(
            `Please fill in the ${field
              .replace(/([A-Z])/g, " $1")
              .toLowerCase()} field`
          );
          return;
        }
      }
    }

    try {
      await updateUserProfile(editData);
      toast.success("Profile Updated!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || "Updation failed!");
      console.error(error);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setEditData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setEditData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      await changeUserPassword(passwordData.currentPassword, passwordData.newPassword);
      toast.success("Password Updated successfully!");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordSection(false);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Current password is incorrect.");
      } else if (error.code === "auth/weak-password") {
        toast.error("New password is too weak.");
      } else {
        toast.error("Failed to change password. Try again.");
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 sm:p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                My Profile
              </h1>
              <p className="text-blue-100 text-lg">
                Manage your account information and preferences
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Image & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {currentUserData?.fullName?.charAt(0) || "U"}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentUserData?.fullName}
                </h2>
                <p className="text-gray-500">{currentUserData?.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendar className="w-4 h-4 mr-3" />
                  <span>
                    Member since{" "}
                    {currentUserData?.createdAt
                      ? new Date(currentUserData.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaShield className="w-4 h-4 mr-3" />
                  <span>Account verified</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Security
              </h3>
              <button
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <FaShield className="w-4 h-4 text-gray-600 mr-3" />
                  <span className="text-sm font-medium text-gray-700">
                    Change Password
                  </span>
                </div>
                <span className="text-gray-600">→</span>
              </button>
            </div>
          </div>

          {/* Main Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <FaUser className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <FaTimes className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2"
                    >
                      <FaSave className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData?.fullName || ""}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {currentUserData?.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData?.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center py-2">
                      <FaEnvelope className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-gray-900">{currentUserData?.email}</p>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData?.phone || ""}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <div className="flex items-center py-2">
                      <FaPhoneAlt className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-gray-900">{currentUserData?.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Address Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Street Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData?.address?.street || ""}
                      onChange={(e) =>
                        handleInputChange("address.street", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {currentUserData?.address?.street}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData?.address?.city || ""}
                      onChange={(e) =>
                        handleInputChange("address.city", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {currentUserData?.address?.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    State
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData?.address?.state || ""}
                      onChange={(e) =>
                        handleInputChange("address.state", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {currentUserData?.address?.state}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    ZIP Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData?.address?.zipcode || ""}
                      onChange={(e) =>
                        handleInputChange("address.zipcode", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {currentUserData?.address?.zipcode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData?.address?.country || ""}
                      onChange={(e) =>
                        handleInputChange("address.country", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">
                      {currentUserData?.address?.country}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Password Change Section */}
            {showPasswordSection && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-red-100 rounded-full mr-3">
                    <FaShield className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Change Password
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          handlePasswordChange(
                            "currentPassword",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current")}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? (
                          <FaEyeSlash className="w-4 h-4" />
                        ) : (
                          <FaEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          handlePasswordChange("newPassword", e.target.value)
                        }
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? (
                          <FaEyeSlash className="w-4 h-4" />
                        ) : (
                          <FaEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          handlePasswordChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? (
                          <FaEyeSlash className="w-4 h-4" />
                        ) : (
                          <FaEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setShowPasswordSection(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePasswordSave}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

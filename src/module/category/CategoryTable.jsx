import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ActionDelete, ActionEdit, ActionView } from "../../components/actions";
import { LabelStatus } from "../../components/label";
import { Table } from "../../components/table";
import { db } from "../../firebase-app/firebase-config";
import { categoryStatus } from "../../utils/constants";

const CategoryTable = ({ categoryList }) => {
  const navigate = useNavigate();

  const handleDeleteCategory = async (docId) => {
    const docRef = doc(db, "categories", docId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Slug</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categoryList.length > 0 &&
          categoryList.map((category) => (
            <tr key={category.id}>
              <th>{category.id}</th>
              <th>{category.name}</th>
              <th>
                <span className="italic text-gray-400">{category.slug}</span>
              </th>
              <th>
                {category.status === categoryStatus.APPROVED && <LabelStatus type="success">Approved</LabelStatus>}
                {category.status === categoryStatus.UNAPPROVED && <LabelStatus type="warning">Unapproved</LabelStatus>}
              </th>
              <th>
                <div className="flex items-center gap-x-3">
                  <ActionView />
                  <ActionEdit onClick={() => navigate(`/manage/update-category/?id=${category.id}`)} />
                  <ActionDelete onClick={() => handleDeleteCategory(category.id)} />
                </div>
              </th>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;

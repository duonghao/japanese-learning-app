import {
  collection,
  DocumentData,
  DocumentReference,
  Firestore,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

const converter = <T>() => {
  return {
    toFirestore(data: WithFieldValue<T>) {
      return data;
    },
    fromFirestore: (
      snapshot: QueryDocumentSnapshot<T>,
      options: SnapshotOptions,
    ) => {
      const data = snapshot.data(options);
      return {
        ...data,
        id: snapshot.id,
      };
    },
  };
};

export function collectionWithConverter<T extends DocumentData>(
  ref: Firestore | DocumentReference<DocumentData, DocumentData>,
  path: string,
  ...pathSegments: string[]
) {
  if (ref instanceof Firestore) {
    return collection(ref, path, ...pathSegments).withConverter(converter<T>());
  }

  return collection(ref, path, ...pathSegments).withConverter(converter<T>());
}

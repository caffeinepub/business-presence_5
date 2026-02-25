import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let submissions = Map.empty<Time.Time, ContactSubmission>();

  // Anyone (including guests) can submit a contact form
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    submissions.add(submission.timestamp, submission);
  };

  // Only admins (business owner) can review all submissions
  public query ({ caller }) func getAllSubmissions() : async [(Time.Time, ContactSubmission)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };
    submissions.toArray();
  };

  public type Rating = {
    id : Nat;
    customerName : Text;
    ratingValue : Nat;
    comment : Text;
  };

  let ratings = Map.empty<Nat, Rating>();
  var nextRatingId = 4;

  public query ({ caller }) func getAllRatings() : async [(Nat, Rating)] {
    ratings.toArray();
  };

  public shared ({ caller }) func addRating(customerName : Text, ratingValue : Nat, comment : Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add ratings");
    };

    let newRating : Rating = {
      id = nextRatingId;
      customerName;
      ratingValue;
      comment;
    };

    ratings.add(nextRatingId, newRating);
    nextRatingId += 1;
    newRating.id;
  };

  public shared ({ caller }) func updateRating(id : Nat, customerName : Text, ratingValue : Nat, comment : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update ratings");
    };

    switch (ratings.get(id)) {
      case (null) { Runtime.trap("Rating not found") };
      case (?_) {
        let updatedRating : Rating = {
          id;
          customerName;
          ratingValue;
          comment;
        };
        ratings.add(id, updatedRating);
      };
    };
  };

  public shared ({ caller }) func deleteRating(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete ratings");
    };

    switch (ratings.get(id)) {
      case (null) { Runtime.trap("Rating not found") };
      case (?_) {
        ratings.remove(id);
      };
    };
  };
};

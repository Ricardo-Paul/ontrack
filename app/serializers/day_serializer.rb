class DaySerializer < ActiveModel::Serializer
  attributes :id, :chosen_date
  has_many :tasks
  has_many :notes
  has_many :lessons
end